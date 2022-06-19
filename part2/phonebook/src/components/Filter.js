import React from 'react'

const Filter = ({filterByName,handleNameFilter}) => {

    return (

       <div>
    filter shown with <input value={filterByName}
    onChange={handleNameFilter} 
    />
       </div>
    
        
    )

}

export default Filter