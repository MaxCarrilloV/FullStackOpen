const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        const booksAuthor = books.filter((b) => b.author === args.author)
        return booksAuthor.filter((b) => b.genres.includes(args.genre))
      }
      if (args.author) {
        return books.filter((b) => b.author === args.author)
      }
      if (args.genre) {
        const books = await Book.find({}).populate('author')
        return books.filter((b) => b.genres.includes(args.genre))
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Book: {
    author: (root) => {
      return {
        id: root.author.id,
        name: root.author.name,
        born: root.author.born,
      }
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter((b) => b.author.name === root.name).length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      let book 
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      try {
        const findAuthor = await Author.findOne({ name: args.author })
        if (!findAuthor) {
          const author = new Author({ name: args.author })
          book = new Book({ ...args, author: author._id })
          author.books = book._id
          await author.save()
        } else {
          book = new Book({ ...args, author: findAuthor._id })
          findAuthor.books = findAuthor.books.concat(book._id)
          await findAuthor.save()
        }
        await book.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })
      return book.populate('author')
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
        username: user.username,
        favoriteGenre: user.favoriteGenre,
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}
module.exports = resolvers