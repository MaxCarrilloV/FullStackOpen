const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      user:"66de59271db4d56741e7ca5f",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      user:"66de59271db4d56741e7ca5f",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      user:"66de59271db4d56741e7ca5f",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      user:"66de59271db4d56741e7ca5f",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      user:"66de59271db4d56741e7ca5f",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      user:"66de59271db4d56741e7ca5f",
      likes: 2,
      __v: 0
    }  
]
const nonExistingId = async () => {
    const blog = new Blog({ title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7 })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}

const usersInDb = async() =>{
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}