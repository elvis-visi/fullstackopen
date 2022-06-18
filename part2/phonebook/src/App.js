import { useState } from 'react'

const Display = ({ name, number }) => {

  return (
    <p> {name} {number}</p>
  )
}

const App = () => {

  //persons -> where we will store the names of the phonebook
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
  number:'123-4566'}
  ])
  console.log("persons", persons);

  //newName to control the form input element
  //we wil set it as the input element's value attribute:
  const [newName, setNewName] = useState('')
  console.log("new name", newName)

  const[newNumber, setNewNumber] = useState('')
  console.log('new number', newNumber)

  //event parameter is the event that triggers the call to the event handler
  //function
  const addPerson = (event) => {
    console.group("event", event.target) //the form
    event.preventDefault() //prevent default action of submitting HTML forms

    //add new note
    const personObject = {
      name: newName,
      number: newNumber
    }

    //if personObjec is already in the array, alert()
    let isDuplicate = false
    for(let i = 0; i< persons.length; i++)
    {
        if( JSON.stringify(personObject) == JSON.stringify(persons[i]))
        {
           alert(`${newName} - ${newNumber} is already added to phonebook`)
           isDuplicate = true
           setNewName('')
           setNewNumber('')
           break
        }
    }
  
    if(!isDuplicate)
    {
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
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit"
          >add</button>
        </div>
      </form>
      <h2>Numbers</h2>


      {persons.map(per =>
        <Display name={per.name} number={per.number} />

      )}

    </div>

  )
}

export default App