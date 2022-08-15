import { useState } from 'react'

const Button = ({onClick, value}) => {
  return <button onClick={onClick}>{value}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [state, setState] = useState({
    points: Array(anecdotes.length).fill(0),
    anecdoteIndex: 0
  })

  const nextAnecdote = () => {
    let newIndex = Math.floor(Math.random() * anecdotes.length)

    const newState = {
      ...state,
      anecdoteIndex: newIndex
    }
    setState(newState)
  }

  const vote = () => {
    const newPoints = [ ...state.points ]
    newPoints[state.anecdoteIndex] += 1
    
    const newState = {
      ...state,
      points: newPoints
    }
    setState(newState)
  }

  return (
    <div>
      <div>{anecdotes[state.anecdoteIndex]}</div>
      <div>has {state.points[state.anecdoteIndex]} votes</div>
      <Button onClick={vote} value='vote'></Button>
      <Button onClick={nextAnecdote} value='next anecdote'></Button>
    </div>
  )
}

export default App