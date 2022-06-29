import { useEffect, useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Display from './components/Display'
import Notification from './components/Notification.js'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterByName, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
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
  
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setNewName('')
    setNewNumber('')

    //check whether the name you are trying to add is a duplicate
    const existingPerson = persons.find(p => p.name === newPerson.name)
    let duplicate = false
    //if it exists, ask whether we want to update the number. window()
    if(existingPerson)
    {
      const ok = window.confirm(`${existingPerson.name} is already added to phonebook, update the number?`)
      duplicate = true
      //update
      if(ok){
        
        personService.update(existingPerson.id, {...existingPerson, number: newNumber})
        .then(savedPerson => {
          setPersons(persons.map(p => p.id === existingPerson.id ? savedPerson : p))
          notify(`Updated info of ${savedPerson.name}`)
        })
        .catch(error => {
          notify(
            `the person '${existingPerson.name}' was had already been from the server`, 'alert'
          )
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
        return
        
      }
     
        
      }

      if(!duplicate)
      {
        personService.create(newPerson).then(savedPerson => {
          setPersons(persons.concat(savedPerson))
          notify(`Added ${savedPerson.name}`)
        })

      }

      
    

  }

  const deleteHandle = (id) => {

    //find the person we want to delete
    const personToDelete = persons.find(p => p.id === id)

    //window.confirm, do you want to delete this person? 
    console.log("id ", id)

    if
      (window.confirm(`Do you want to delete ${[personToDelete.name]}`)) {
      personService.remove(id).then(()=>{
        setPersons(persons.filter(p => p.id !== id))
        //notify
        notify(`Deleted ${personToDelete.name}`)
      })

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
      <Notification notification={notification} />
      <Filter 
      filterByName={filterByName}
        handleNameFilter={handleNameFilter} />

      <Person 
      addPerson={addPerson}
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