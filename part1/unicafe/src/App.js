import { useState } from 'react'

const Button = ({onClick, text}) => {
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
  // const [average, setAverage] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const sum = () => good + neutral + bad
  const average = () => {
    let average = (good * 1 + neutral * 0 + bad * -1) / sum()
    if (isNaN(average)) average = 0
    return average
  }
  const positive = () => {
    let positive = (good / sum()) * 100
    if (isNaN(positive)) positive = 0
    return positive
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'></Button>
      <Button onClick={handleNeutralClick} text='neutral'></Button>
      <Button onClick={handleBadClick} text='bad'></Button>

      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {sum()}</div>
      <div>average {average()}</div>
      <div>positive {positive()} %</div>
    </div>
  )
}

export default App
