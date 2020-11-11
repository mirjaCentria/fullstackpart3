const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
]
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
  const info = `Phonebook has info for ${persons.length} people`
  const date = Date()
  response.send(`<p>${info}</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)
  console.log(persons)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id)) 
    : 0
  const person = request.body
  person.id = maxId + 1
  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})








const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})