const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
        {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  const parts = props.parts.map((p, index) => <Part key={index} part={p.name} exercise={p.exercises}/>
  )
  
  return (
    <div>
      {parts}
    </div>
  )
}

const Total = (props) => {
  console.log(props.parts)
  const total = props.parts.reduce((accumulator, current) => accumulator + current.exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default App