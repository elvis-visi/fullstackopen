import { useState } from 'react'

const Button = ({onClick,text}) => {

  return (
    <button onClick={onClick}>
      {text}
    </button>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

 const [selected, setSelected] = useState(0)
 const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

 console.log(`current votes: ${vote}`)
  //update the selected anecdote using the setSelected function
  //pass a random selection, take the length of the array in consideration

  let rand = Math.floor(Math.random() * anecdotes.length) 
  console.log(`Current anecdote: ${selected}\n Random value: ${rand}`)
  const handleNextAnecdote = () => {

    setSelected(rand)
  }
  

  //handle votes, increase the votes on click of button
  const handleVote = () => {
    //make copy of the array
    let arr = [...vote]
 

    //vote goes to the current anecdote -> current random value
    arr[selected]++
    setVote(arr)
   
  }

  let currentAnecdote = rand

  return (
    <div>
      {anecdotes[selected]}
      <div>
      <Button onClick={handleVote}  text = "Vote"/> 
      <Button onClick={handleNextAnecdote}  text = "Next anecdote"/>
        </div>

    </div>
  )
}

export default App