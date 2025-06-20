const express = require('express')
const app = express()

// Logging Middleware
const morgan = require('morgan')

// Serve static files
app.use(express.static('dist'))

// Parse request body
app.use(express.json())

// Declare custom body token once, outside middleware so it doesn't repeat
morgan.token('body', (req) => JSON.stringify(req.body))

// Using custom function to format the log
app.use(morgan((function (tokens, req, res) {

    // Adding default tokens in correct format order to array
    let log = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]

    // Append body only for POST requests with a non-empty body
    if (req.method === "POST" && req.body && Object.keys(req.body).length > 0) {
        log.push(tokens.body(req))
    }

    // Join the array into one string and return
    return log.join(' ')
})))

// Data
let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// Routes
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date
    const message = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `
    response.send(message)
})

app.get('/api/persons/:id', (request, response) => {

    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        return response.status(404).json({ error: 'Person not found' })
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {

    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const nameExists = persons.some(person => person.name === body.name)
    const numberExists = persons.some(person => person.number === body.number)

    if (!body.name) {
        return response.status(400).json({ error: 'name is missing' });
    }

    if (!body.number) {
        return response.status(400).json({ error: 'number is missing' });
    }

    if (nameExists) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    if (numberExists) {
        return response.status(400).json({ error: 'number must be unique' })
    }

    const person = {
        id: String(Math.floor(Math.random() * 1000)),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})