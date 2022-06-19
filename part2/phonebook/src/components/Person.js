import React from 'react'

const Person = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => 
{

return (

    <form onSubmit={addPerson} >
        <h1>add a new</h1>
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number <input value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit"
          >add</button>
        </div>
      </form>
)
}

export default Person
