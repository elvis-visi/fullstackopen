import { useState } from 'react'


const Button = ({ onClick, text }) => {

  //Passing the onClick event and the text of the button
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = (props) => {

 
  //average: (good - bad) / total
  let average = ((props.scores[0] - props.scores[2])/props.total) 

  
 
//good +1 score, neutral= 0, bad = -1
//positive, good over total

console.log(average)

if(!isNaN((average)))
{
  return (
    <div>
      <div>Good : {props.scores[0]}</div>
      <div>Neutral : {props.scores[1]}</div>
      <div>Bad : {props.scores[2]}</div>
      <div>All: {props.scores[0] + props.scores[1] + props.scores[2]}</div>
      <div>Average: {average}</div>
      <div>Positive: {((props.scores[0]/total) * 100)} % </div>
   </div>
   
  )
}



  return(
    <div>
      No feedback given
    </div>

  )

  


 

}

//total 
let total = 0
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 

  const handleGoodClick = () => {
    //update/increase the good state by 1
    setGood(good + 1)
    total++
    console.log({total})
}
  const handleNeutralClick = () => {
    //update/increase the neutral state by 1
    setNeutral(neutral + 1)
    total++
    console.log({total})
}
  const handleBadClick = () => {
    //update/increase the bad state by 1
    setBad(bad + 1)
    total++
    console.log({total})
}

  return (
    <div>
      <h1>Give feeback</h1>

      <Button onClick={handleGoodClick}
        text="Good" />

      <Button onClick={handleNeutralClick}
        text="Neutral" />

      <Button onClick={handleBadClick}
        text="Bad" />
      <div>
        <h2>Statistics </h2>
         <Statistics  scores  = {[good, neutral , bad]} 
         total = {total}/> 
      </div>
    </div>
  )
}

export default App