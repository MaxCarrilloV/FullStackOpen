import { gql } from '@apollo/client'

export const AllAuthors = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const AllBooks = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const BookByFavorite = gql`
  query BookByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CreateBook = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const Edit_Author = gql`
  mutation UpdateAuhor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      username
      favoriteGenre
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      genres
    }
  }
`