import { useEffect, useState } from 'react'

const Display = ({ name, number }) => {

  return (
    <p> {name} {number}</p>
  )
}

const App = () => {

  //persons -> where we will store the names of the phonebook
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  console.log("persons", persons);

  //newName to control the form input element
  //we wil set it as the input element's value attribute:
  const [newName, setNewName] = useState('')
  console.log("new name", newName)

  const[newNumber, setNewNumber] = useState('')
  console.log('new number', newNumber)

  //search field
  const[filterByName, setNewFilter] = useState('')

  const[idPerson, setNewId] = useState(persons.length + 1)
  console.log("id Person" ,idPerson)

  const handleNameFilter = (event) => {
    console.log("event target value", event.target.value)
    setNewFilter(event.target.value)
  }

  const peopleToShow = persons.filter(per => per.name.toLocaleLowerCase().includes(filterByName.toLowerCase()))
  console.log("people to show",peopleToShow)

  //if filterByName 
    let phoneBookToShow 

    if(filterByName.length != 0 && peopleToShow.length != 0)
    {
      phoneBookToShow = peopleToShow

    }else{
      phoneBookToShow = persons
    }


  //event parameter is the event that triggers the call to the event handler
  //function

  useEffect (() => {setNewId(persons.length + 1)})

  const addPerson = (event) => {
    console.group("event", event.target) //the form
    event.preventDefault() //prevent default action of submitting HTML forms
  

    //add new note
    const personObject = {
      name: newName,
      number: newNumber,
      id : idPerson
      //id: 
    }

    //if personObjec is already in the array, alert()
    let isDuplicate = false

    //compare the name and number only, ingore the id
    const personCompare = persons.map(function(per)
    {
      return per.name + per.number
    })
  
    console.log("comparison", personCompare)

    for(let i = 0; i< personCompare.length; i++)
    {
          const obj = personObject.name + personObject.number
    //

        if( JSON.stringify(obj) === JSON.stringify(personCompare[i]))
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
       filter shown with <input value={filterByName}
       onChange={handleNameFilter}/>
     
      <form onSubmit={addPerson} >
       <h1>add a new</h1>
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


      {phoneBookToShow.map(per =>
        <Display key= {per.id} name={per.name} number={per.number} />

      )}

    </div>

  )
}

export default App