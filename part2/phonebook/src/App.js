import { useState } from 'react'

const Display = ({ name }) => {

  return (
    <p> {name} </p>
  )
}

const App = () => {

  //persons -> where we will store the names of the phonebook
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  console.log("persons", persons);

  //newName to control the form input element
  //we wil set it as the input element's value attribute:
  const [newName, setNewName] = useState('')
  console.group("new name", newName)

  //event parameter is the event that triggers the call to the event handler
  //function
  const addPerson = (event) => {
    console.group("event", event.target) //the form
    event.preventDefault() //prevent default action of submitting HTML forms

    //add new note
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  //handle Name change, event.target -> form; event.target.value -> the value
  // of the input of the form, the new Name in our case

  //event handler is called every time a change occurs in the input element.
  //
  const handleNameChange = (event) => {

    console.log("event target value", event.target.value)
    setNewName(event.target.value) //update the state of newName
  }

  return (

    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit"
          >add</button>
        </div>
      </form>
      <h2>Numbers</h2>


      {persons.map(name =>
        <Display name={name.name} />

      )}

    </div>

  )
}

export default App