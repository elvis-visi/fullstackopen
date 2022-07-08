
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

 //importing the model
 const Person = require('./models/person')

const morgan = require('morgan')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))




/*mongoose
//const mongoose = require('mongoose')

//const url = `mongodb+srv://fullstack:fullstack@cluster0.idihi.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String

})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person',personSchema)

*/



console.log('hello world')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//json-parser takes raw data from the requests that is stored in the 
//request object
//parses it into a JS object and assigns it to the request object as a new
//property body

//app.use(requestLogger)

app.use(morgan('tiny'))

morgan.token('post', function (req, res) 
{ 
  if(req.method === 'POST')
  {
    return JSON.stringify(req.body)
  }
  
  else
  return ''

})




app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (request, response) => {
   
  Person.find({}).then(person => {
    response.json(person)
  })

  })


  app.get('/api/info', (request, response) => {
   
    let date =  new Date()
    const info = `Phonebook has info for ${persons.length} people <br><br> ${date}`
    
    response.send(info)
  })

  //fetch single resource
  app.get('/api/persons/:id' , (request, response, next) => {
  
    Person.findById(request.params.id)
    .then(person => {
      if(person)
      {
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
    //error given to the next function as a parameter
   
  })


  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  // handler of requests with unknown endpoint
//app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError'){
      return response.status(400).send({ error: 'malformatted id' })
    }


    next(error)
  }

  

  app.delete('/api/persons/:id',(request, response) =>{
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error =>  next(error))
    //passed to the next middleware

  })

  const generateId = () => {
      const id = 
      Math.floor(Math.random() * 1000000);

      return id;
  }
//content property may not be empty
  app.post('/api/persons',(request, response) => {
   
    const body = request.body
    console.log("body: ", body)
    
    //if eithere the name or number is missing
    if(!body.name || !body.number)
    {
        return response.status(400).json({ 
            error: 'content missing' 
          })
    }
   
  
    const person = new Person({

      name: body.name,
      number : body.number

    })


    person.save().then(savedPerson => {
      response.json(savedPerson)
    })

  
  })

  app.use(errorHandler)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })