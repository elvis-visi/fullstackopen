const mongoose = require('mongoose')

if (process.argv.length < 3)
{
    console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.idihi.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.connect(url)


//how the phonebooks are to be stored in the database
const personSchema = new mongoose.Schema({
    name: String,
    number: String

})

const Person = mongoose.model('Person',personSchema)

/*mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
        name : 'rik',
        number : '1223-123'
    })

    return person.save()


  })
  .then(() => {
    console.log('person saved!')
    return mongoose.connection.close()

  })
  .catch((err) => console.log(err))*/

  if(process.argv.length === 3)
  {
     console.log('phonebook:') 
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number )
        })
        mongoose.connection.close()
      })
  }

  //if 5 arguments entered, then add a new person to the phonebook

  if(process.argv.length === 5)
  {

        //process.argv[3] == name  process.argv[4] == number


        const person = new Person ({

            name: process.argv[3],
            number : process.argv[4]
        })

        person.save().then(results => {
            console.log(`added ${person.name} number ${person.number} to phonebook `)
        })





  }



 

