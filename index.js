require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

//app.use(morgan('tiny'))

morgan.token('body', (request, response) => {
    
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    } else {
        return null
    }
})
//app.use(morgan(':method :url :status :response[content-length] - :response-time ms :body'))

let persons = []


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', cors(), (request, response) => {
  const info = `Phonebook has info for ${persons.length} people`
  const date = Date()
  response.send(`<p>${info}</p><p>${date}</p>`)
})

app.get('/api/persons/:id', cors(), (request, response, next) => {
  const id = request.params.id
  console.log(id)
  Person.findById(request.params.id)
  .then(person => {
   console.log(person)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', cors(), (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })
  .catch(error => next(error))
})


app.post('/api/persons', cors(), (request, response) => {
  const body = request.body
 // console.log('apppost', body.name)
  
  if (body.name == null || body.number == null ) {
    return response.status(400).json({
        error: 'number is missing'
    }) 
  }
  if (!persons.every(p => p.name !== body.name)) {
    return response.status(400).json({
        error: 'name must be unique'
    })
  }
  if (body.name === undefined) {
    return response.status(400).json({ 
      error: 'name is missing!' 
    })
  }

  if (body.number === undefined) {
    return response.status(400).json({ 
      error: 'number is missing!' 
    })
  }

 // console.log('apppost2')
  const person = new Person({
    name: body.name,
    number: body.number
  })
 // console.log('apppost3')
  person.save().then(saved => {
    response.json(saved)
  })
  persons = persons.concat(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


//const PORT = process.env.PORT 
const PORT = 3001
console.log({PORT})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

