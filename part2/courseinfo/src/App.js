const Header = (props) => {
  return (
    <h2>{props.course.name}</h2>
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
  const parts = props.course.parts.map((p, index) => <Part key={index} part={p.name} exercise={p.exercises} />)

  return (
    <div>
      {parts}
    </div>
  )
}

const Total = (props) => {
  const total = props.course.parts.reduce((accumulator, current) => accumulator + current.exercises, 0)
  return (
    <strong>total of {total} exercices</strong>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  )
}


// const Content = (props) => {
//   const parts = props.course.parts.map((p, index) => <Part key={index} part={p.name} exercise={p.exercises}/>)

//   return (
//     <div>
//       {parts}
//     </div>
//   )
// }
export default App