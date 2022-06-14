import { useState } from 'react'


const Button = ({ onClick, text }) => {

  //Passing the onClick event and the text of the button
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    //update/increase the good state by 1
    setGood(good + 1)

  }
  const handleNeutralClick = () => {
    //update/increase the neutral state by 1
    setNeutral(neutral + 1)

  }
  const handleBadClick = () => {
    //update/increase the bad state by 1
    setBad(bad + 1)

  }

  const Display = ({ score, text }) => {
    return (
      <div>
        {text} : {score}
      </div>
    )
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
        <Display score={good}
          text='Good' />
        <Display score={neutral}
          text='Neutral' />
        <Display score={bad}
          text='Bad' />
      </div>
    </div>
  )
}

export default App