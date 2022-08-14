import { useState } from 'react'

// Example: Storing all of the state in a single state object
// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   })
//
//   const handleLeftClick = () =>
//     setClicks({ ...clicks, left: clicks.left + 1 })
//     // object spread: { ...clicks } creates a new object that has copies of all of the properties of the clicks object
//
//   const handleRightClick = () =>
//     setClicks({ ...clicks, right: clicks.right + 1 })
//
//   return (
//     <div>
//       {clicks.left}
//       <button onClick={() => handleLeftClick()}>
//         left
//       </button>
//       <button onClick={() => handleRightClick()}>
//         right
//       </button>
//       {clicks.right}
//     </div>
//   )
// }

const History = (props) => {
  // Conditional rendering
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = props => <div>{props.value}</div>

const App = () => {
  // Example: Complex state
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  // Example: Functions that returns a function
  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  const helloWho = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }
  // equivalent to
  const helloWho2 = (who) => {
    return () => {
      console.log('hello', who)
    }
  }
  // equivalent to
  const helloWho3 = (who) => () => {
    console.log('hello', who)
  }

  // Example: event handlers that set the state
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }

  // Exemple: Do Not Define Components Within Components
  // const Display = props => <div>{props.value}</div> // never do this (makes it impossible for React to optimize the component)
  
  return (
    <div>
      <h3>Complex state:</h3>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
      
      <br/>
      <h3>Function that returns a function:</h3>
      <button onClick={hello()}>button</button>
      <br/>
      <button onClick={helloWho('world')}>button</button>
      <button onClick={helloWho2('react')}>button</button>
      <button onClick={helloWho3('function')}>button</button>

      <br/>
      <h3>Event handlers that set the state:</h3>
      <Display value={value} />
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>

    </div>
  )
}

export default App;
