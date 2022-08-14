import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return <div>{text} {value}</div>
} 

const Statistic = ({ good, neutral, bad }) => {
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

  if (sum()) {
    return <div>
      <StatisticLine text='good' value={good}></StatisticLine>
      <StatisticLine text='neutral' value={neutral}></StatisticLine>
      <StatisticLine text='bad' value={bad}></StatisticLine>
      <StatisticLine text='all' value={sum()}></StatisticLine>
      <StatisticLine text='average' value={average()}></StatisticLine>
      <StatisticLine text='positive' value={positive()+' %'}></StatisticLine>
    </div>
  } else {
    return <div>No feedback given</div>
  }
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

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'></Button>
      <Button onClick={handleNeutralClick} text='neutral'></Button>
      <Button onClick={handleBadClick} text='bad'></Button>
      <h1>statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad}></Statistic>
    </div>
  )
}

export default App
