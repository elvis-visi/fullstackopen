import { useEffect, useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Display from './components/Display'
import axios from 'axios'

import personService from './services/persons'

const App = () => {

 

 //persons -> where we will store the names of the phonebook
  const[persons, setPersons] = useState([])
  //newName to control the form input element
  //we wil set it as the input element's value attribute:
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //search field
  const [filterByName, setNewFilter] = useState('')



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
    //fetch the data from db.json and set the person array 
    personService
    .getAll()
    .then(intialNotes => {
      setPersons(intialNotes)
    })
  
  }, [])
  console.log('render', persons.length, 'notes')

  //event parameter is the event that triggers the call to the event handler
  //function


  const addPerson = (event) => {
    console.group("event", event.target) //the form
    event.preventDefault() //prevent default action of submitting HTML forms


    //add new note
    const personObject = {
      name: newName,
      number: newNumber,
    }

    //if personObjec is already in the array, alert()
    let isDuplicate = false

  

    for (let i = 0; i < persons.length; i++) {
      const obj = personObject.name + personObject.number
      //

      if (JSON.stringify(obj) === JSON.stringify(persons[i])) {
        alert(`${newName} - ${newNumber} is already added to phonebook`)
        isDuplicate = true
        setNewName('')
        setNewNumber('')
        break
      }
    }

    if (!isDuplicate) {
      //create service 
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      
      
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  const deleteHandle  = (id) => {

    //unique url based on the id
    const url = `http://localhost:3001/persons/${id}`
    console.log("url is ",url)
    //find the person we want to delete
    const personToDelete = persons.find(p => p.id == id)

    //window.confirm, do you want to delete this person? 
    console.log("id " ,id)
    
    if
    (window.confirm(`Do you want to delete ${[personToDelete.name]}`) ) {
        axios.delete(url,personToDelete) //no data sent back

      window.open("deleted")
      
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
        <Display key={per.id} 
        name={per.name} 
        number={per.number} 
        deleteHandle =  {() => deleteHandle(per.id)}
        />

      )}

    </div>

  )
}

export default App