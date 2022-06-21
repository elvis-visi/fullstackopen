import { useEffect, useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Display from './components/Display'
import axios from 'axios'

const App = () => {

 

 //persons -> where we will store the names of the phonebook
  const[persons, setPersons] = useState([])
  //newName to control the form input element
  //we wil set it as the input element's value attribute:
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //search field
  const [filterByName, setNewFilter] = useState('')
  const [idPerson, setNewId] = useState(persons.length + 1)


  const handleNameFilter = (event) => {
    console.log("event target value", event.target.value)
    setNewFilter(event.target.value)
  }

  const peopleToShow = persons.filter(per => per.name.toLocaleLowerCase().includes(filterByName.toLowerCase()))
  console.log("people to show", peopleToShow)

  //if filterByName 
  let phoneBookToShow

  if (filterByName.length != 0 && peopleToShow.length != 0) {
    phoneBookToShow = peopleToShow

  } else {
    phoneBookToShow = persons
  }


  //fetch persons users
  useEffect(() => {

    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })

  }, [])
  console.log('render', persons.length, 'notes')

  //event parameter is the event that triggers the call to the event handler
  //function

  useEffect(() => { setNewId(persons.length + 1) })

  const addPerson = (event) => {
    console.group("event", event.target) //the form
    event.preventDefault() //prevent default action of submitting HTML forms


    //add new note
    const personObject = {
      name: newName,
      number: newNumber,
      id: idPerson
      //id: 
    }

    //if personObjec is already in the array, alert()
    let isDuplicate = false

    //compare the name and number only, ingore the id
    const personCompare = persons.map(function (per) {
      return per.name + per.number
    })

    console.log("comparison", personCompare)

    for (let i = 0; i < personCompare.length; i++) {
      const obj = personObject.name + personObject.number
      //

      if (JSON.stringify(obj) === JSON.stringify(personCompare[i])) {
        alert(`${newName} - ${newNumber} is already added to phonebook`)
        isDuplicate = true
        setNewName('')
        setNewNumber('')
        break
      }
    }

    if (!isDuplicate) {
      
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(respone => {
        setPersons(persons.concat(respone.data))
      })
      
      
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  //handle Name change, event.target -> form; event.target.value -> the value
  // of the input of the form, the new Name in our case

  //event handler is called every time a change occurs in the input element.
  //
  const handleNameChange = (event) => {

    console.log("event target value", event.target.value)
    setNewName(event.target.value) //update the state of newName
  }

  const handleNumberChange = (event) => {
    console.log("event target value", event.target.value)
    setNewNumber(event.target.value)
  }


  return (

    <div>
      <h2>Phonebook</h2>
      <Filter filterByName={filterByName}
        handleNameFilter={handleNameFilter} />

      <Person addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>


      {phoneBookToShow.map(per =>
        <Display key={per.id} name={per.name} number={per.number} />

      )}

    </div>

  )
}

export default App