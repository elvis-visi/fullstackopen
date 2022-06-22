import React from 'react'

const Display = ({ persons, deleteHandle }) => {

  return (
    //add a onClick event, wiil be passed as a param above
    //on click call delete, with id of the person -> delete their URL/id
    <>
      {
        persons.map(person =>
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deleteHandle(person.id)}>

              delete

            </button>

          </p>

        )
      }
    </>
  )

}


export default Display