const express = require('express')
const app = express()

const morgan = require('morgan')

const cors = require('cors')

app.use(cors())


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
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

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
    response.json(persons)
  })


  app.get('/api/info', (request, response) => {
   
    let date =  new Date()
    const info = `Phonebook has info for ${persons.length} people <br><br> ${date}`
    
    response.send(info)
  })

  //fetch single resource
  app.get('/api/persons/:id' , (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if(person)
    {
        response.json(person)
    }else{
        response.status(404).end()
    }

   
  })

  app.delete('/api/persons/:id',(request, response) =>{
    const id = Number(request.params.id)
    persons = persons.filter(per => per.id !== id)

    response.status(204).end()

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
    else if(persons.find(p => p.name === body.name))
    {
        return response.status(400).json({
            error: 'name must be unique '
        })
    }
    else
    {
        const person = {
            id : generateId(),
            name : body.name,
            number: body.number
            
        }
    
        persons = persons.concat(person)
        response.json([person])
    }

  
  })



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)