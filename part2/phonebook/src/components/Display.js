import React from 'react'

const Display = ({ name, number ,deleteHandle }) => {

    return (
      //add a onClick event, wiil be passed as a param above
      //on click call delete, with id of the person -> delete their URL/id
      <li> {name} {number}
         <button onClick={deleteHandle}>
       delete
      </button> 
      </li>  
    )
  }


  export default Display