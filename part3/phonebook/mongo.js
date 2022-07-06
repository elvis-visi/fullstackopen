const mongoose = require('mongoose')

if (process.argv.length < 3)
{
    console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.idihi.mongodb.net/phoneBookApp?retryWrites=true&w=majority`
//how the phonebooks are to be stored in the database
const personSchema = new mongoose.Schema({
    name: String,
    number: String

})

const Person = mongoose.model('Person',personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
        name : 'Visi',
        number : '1223-123'
    })

    return person.save()


  })
  .then(() => {
    console.log('person saved!')
    return mongoose.connection.close()

  })
  .catch((err) => console.log(errr))

