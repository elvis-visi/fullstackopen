import { useEffect, useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Display from './components/Display'
import axios from 'axios'

import personService from './services/persons'


const Notification = ({ message }) => {
  //if null nothing gets rendered to the screen
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}


const App = () => {



  //persons -> where we will store the names of the phonebook
  const [persons, setPersons] = useState([])
  //newName to control the form input element
  //we wil set it as the input element's value attribute:
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //search field
  const [filterByName, setNewFilter] = useState('')

  const [message, setMessage] = useState(null)

  const notify = (message, type = 'info') => {
    setMessage({message,type})
    setTimeout(() => {
      setMessage(null)
    },3000)
  }


 //filter based on search
  const handleNameFilter = (event) => {
    console.log("filter value", event.target.value)
    setNewFilter(event.target.value)
  }
 //if no filter show the fetched people at the beginning
 //else, show those which correspond to the filter
  const peopleToShow = (filterByName.length === 0 ) ? persons :
  persons.filter(per => per.name.toLocaleLowerCase().includes(filterByName.toLowerCase()))
  console.log("people to show", peopleToShow)



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
      //if only the name is the same
      else if (personObject.name === persons[i].name) {


        isDuplicate = true
        if (window.confirm(`${persons[i].name} is already in the phonebook
        ,replace the old number with the new one?`)) {
          window.open("Number updated")
          //update
          const idPer = persons[i].id
          const url = `http://localhost:3001/persons/${idPer}`
          const person = persons.find(n => n.id === idPer)

          const numberChange = { ...person, number: personObject.number }

          axios.put(url, numberChange)
            .then(response => {
              setPersons(persons.map(per => per.id !== idPer ? per : response.data))
            })
            .catch(error => {
              
  
                setMessage(`the note '${persons[i].name}' was already deleted from server`)
          
            })

          setMessage(` Number ${personObject.number} added`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)




        }


      }
    }

    if (!isDuplicate) {

      //if name is the same, but number is not, then update the number
      //create service 
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setMessage(` ${personObject.name} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }

  }

  const deleteHandle = (id) => {

    //unique url based on the id
    const url = `http://localhost:3001/persons/${id}`
    console.log("url is ", url)
    //find the person we want to delete
    const personToDelete = persons.find(p => p.id == id)

    //window.confirm, do you want to delete this person? 
    console.log("id ", id)

    if
      (window.confirm(`Do you want to delete ${[personToDelete.name]}`)) {
      axios.delete(url, personToDelete) //no data sent back

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
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filterByName={filterByName}
        handleNameFilter={handleNameFilter} />

      <Person addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h1>Numbers</h1>


     
        <Display 
          persons = {peopleToShow}
          deleteHandle={deleteHandle}
        />

      

    </div>

  )
}

export default App