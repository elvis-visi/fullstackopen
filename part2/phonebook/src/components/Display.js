import React from 'react'

const Display = ({ name, number }) => {

    return (
      //add a onClick event, wiil be passed as a param above
      //on click call delete, with id of the person -> delete their URL/id
      <p> {name} {number}
         <button>
       delete
      </button> 
      </p>  
    )
  }


  export default Display