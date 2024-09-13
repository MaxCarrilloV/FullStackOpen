const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
    let aut 
    beforeEach(async() => {
      await Blog.deleteMany({})
      await User.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)

      const  userLogin = {
        username:'root',
        name:'root',
        password:'12345678'
      }
      await api
        .post('/api/users')
        .send(userLogin)

      const response = await api
            .post('/api/login')
            .send(userLogin)
      aut = {
        'Authorization': `Bearer ${response.body.token}`
      }
    })
    
    test('blogs are returned as json', async () =>{
        await api
        .get('/api/blogs')
        .set(aut)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('The unique identifier property of the blog posts is by default _id', async () => {
        const response = await api.get('/api/blogs').set(aut)
        assert(response.body[0].id, 'The id property is not defined')
        assert(!response.body[0]._id, 'The _id property is present when it should not be')
    })
    
    test('a valid blog can be added',async () =>{
      const blog = {title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 10 }
  
      await api
      .post('/api/blogs')
      .send(blog)
      .set(aut)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const response = await api.get('/api/blogs').set(aut)
      assert.strictEqual(response.body.length, helper.initialBlogs.length+1)
    })

    test('property likes is missing, likes is 0',async () =>{
        const blog = {title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/"}
        
        const response = await api
                        .post('/api/blogs')
                        .send(blog)
                        .set(aut)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(response.body.likes,0)
    })
    
    test('if the title or url properties of the requested data are missing',async () =>{
        const blog = { author: "Michael Chan"}
        await api
        .post('/api/blogs')
        .send(blog)
        .set(aut)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('delete a blog', async ()=>{
      const blogNew = {title: "React patterns 2",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 10 }
    
        await api
        .post('/api/blogs')
        .send(blogNew)
        .set(aut)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[blogsAtStart.length-1]
        
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(aut)
        .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd.map(r => r.title)
        assert(!contents.includes(blogToDelete.title))
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length-1)        
    })

    test('update a blog', async ()=>{
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = blogToUpdate.likes + 1
        const blogUp = await api
                            .put(`/api/blogs/${blogToUpdate.id}`)
                            .send(blogToUpdate)
                            .set(aut)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
        assert.deepStrictEqual(blogUp.body.id, blogToUpdate.id)
    })
  
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('secret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('expected `username` to be unique'))
  
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is less than three', async() =>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'hellas',
            name: 'Art hellas',
            password: 'ab'
        }

        const result = await api
                            .post('/api/users')
                            .send(newUser)
                            .expect(400)
                            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('password length is less than three'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})


after(async () => {
    await mongoose.connection.close()
})