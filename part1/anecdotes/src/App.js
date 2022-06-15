import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
 
const MaxDisplay = ({ votes, anec }) => {
//  find the max value in the array, and its index
  let max = votes.reduce(function (a, b) {
    return Math.max(a, b);
  });
  let maxIndex = votes.indexOf(max)

  console.log(`max is ${max}`)
  console.log(`max anac is ${maxIndex}`)
  
  return (
    <div>{anec[maxIndex]} <p> has {votes[maxIndex]} votes</p></div>
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
  //keep track of the selection and of the votes per each anecdote
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  console.log(`current votes: ${vote}`)
  //update the selected anecdote using the setSelected function
  //pass a random selection, take the length of the array in consideration
  let rand
  const handleNextAnecdote = () => {
    rand = Math.floor(Math.random() * anecdotes.length)
   setSelected(rand)
  }
  //handle votes, increase the votes on click of button
  const handleVote = () => {
    //make copy of the array
    let arr = [...vote]
   //vote goes to the current anecdote
    arr[selected]++
    setVote(arr)
}
  
  let currentAnecdote = rand

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>

      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleNextAnecdote} text="Next anecdote" />

      <h1>Anecdote with most votes</h1>
      <MaxDisplay votes={vote} anec={anecdotes} />
   </div>
  )
}

export default App
