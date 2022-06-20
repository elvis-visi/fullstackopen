import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

const Display= ({name}) => {

  return (
    <p> {name}</p>
  )

}

const Country = ({country}) => {


}


function App() {
  
  //useState to store the data fetched 
  //useState country name
  //useState filter by name? 

  const[countries, setCountries] = useState([])
  const[filterbyName,setNewFilter] = useState('')
  const[country,setCountry] = useState('')

 
//2 Search query → filter

const handleNameFilter = (event => {
  console.log("event target value", event.target.value)
  setNewFilter(event.target.value)
})

 /*
If more than 10 countries, prompt user to make query more specific

if more than 1 and less than 10 → list the names of all the countries

if only 1 country - display country name, capital, area 

languages bullet list.

Flag

  */

const countriesToShow = countries.filter(country => country.name.common.
  toLowerCase().includes(filterbyName.toLowerCase()))
  console.log("people to show", countriesToShow)



  

  useEffect(() => {
    
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })


  },[])

  //console.log("countries",countries[0].name.common)


  //search query filter   Form, input, input value, onchange
  

  //handleNameFilter -> event, event.target.value
  

  //countriesToShow logic,  3 different conditions
  
  
  return (
   
  <div>
    find countries <input 
    value={filterbyName}
    onChange={handleNameFilter}/>
    



    {countriesToShow.map(country => 
      <Display  key={country.name.common} 
      name = {country.name.common} />
      
      )}


  </div>


  )

}





export default App;
