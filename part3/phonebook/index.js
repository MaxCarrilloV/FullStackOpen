require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
app.use(express.static('dist'))
app.use(cors())

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request,response) => {
  Person.find({})
  .then(result =>{
    response.json(result)
  })
})

app.get('/info', (request,response) => {
  const date = new Date()
  Person.find({}).then(person =>{
    response.send(`<p>Phonebook has info for ${person.length} people</p><p>${date}</p>`)
  })
}) 

app.get('/api/persons/:id',(request, response ,next) =>{
  Person.findById(request.params.id)
  .then(person =>{
    response.json(person)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) =>{
  Person.findByIdAndDelete(request.params.id).then(() =>{
    response.status(204).end() 
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request,response,next) =>{
  const body = request.body
  // const idG = Math.floor(Math.random() * (999999999999 - 1000) + 1000)
  if(!body.name || !body.number){
    return response.status(400).send({ error: 'name or number is missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    // id: idG
  })
  person.save().then(savePer =>{
    response.json(savePer)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id',(req,res,next) =>{
  const body = req.body
  if (body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
  .then(upd =>{
    res.json(upd.toJSON())
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})