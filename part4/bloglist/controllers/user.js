const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async(req,res)=>{
    const users = await User.find({}).populate('blogs',{url:1,author:1,title:1})
    res.json(users)
})

userRouter.post('/', async(req,res)=>{
    const {username, name, password} = req.body
    if(password.length<3){
        res.status(400).json({error:'password length is less than three'})
    }

    const passwordHash = await bcrypt.hash(password,10)

    const user = new User({
        username,
        name,
        passwordHash
    })
    const userSaved = await user.save()
    res.status(201).json(userSaved)
})

module.exports = userRouter