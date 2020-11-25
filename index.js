const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('build'))

app.use(cors())
app.use(express.json())
//app.use(morgan('tiny'))
/*
morgan.token('body', (req, res) => {
    
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return null
    }
})
app.use(morgan(':method :url :status :response[content-length] - :response-time ms :body'))
*/


const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  `mongodb+srv://fullstack:${password}@fullstack.vr8vi.mongodb.net/persons?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

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

app.get('/api/persons/:id', cors(), (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  console.log(person)
  if (person) {
      response.json(person)
  } else {
      response.status(404).end()
  }
})

app.delete('/api/persons/:id', cors(), (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)
  console.log(persons)
  response.status(204).end()
})

app.post('/api/persons', cors(), (request, response) => {
  const body = request.body
  if (body.name == null || body.number == null ) {
    return response.status(400).json({
        error: 'content is missing'
    }) 
  }
  if (!persons.every(p => p.name !== body.name)) {
    return response.status(400).json({
        error: 'name must be unique'
    })
}
const randId = Math.floor(Math.random() * 100) 
const person = {
  id: randId,
  name: body.name,
  number: body.number
}
  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

