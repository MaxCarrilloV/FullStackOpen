const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware');
blogRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user',{username:1,name:1})
   response.json(blogs)
})
  
blogRouter.post('/',middleware.userExtractor, async (request, response) => {
    const {title , author, url, likes} = request.body
    const user = request.user
    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user:user._id
    })
    const blogSaved = await blog.save()
    user.blogs = user.blogs.concat(blogSaved)
    await user.save()
    response.status(201).json(blogSaved)
})

blogRouter.post('/:id/comments', async (req,res) => {
    const body = req.body
    const blog = {
        comments:body.comments
    }
    const upBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(upBlog)
})

blogRouter.delete('/:id',middleware.userExtractor, async (req,res) =>{
    const user = req.user
    const blog = await Blog.findById(req.params.id)
    if(blog.user._id.toString() === user._id.toString()){
        await Blog.findByIdAndDelete(req.params.id)
        return res.status(204).end()
    }else{
        res.status(401).json({error:'Unauthorized'})
    }
})

blogRouter.put('/:id',async(req,res) =>{
    const body = req.body
    const blog = {
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes
    }
    const upBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(upBlog)
})



module.exports = blogRouter