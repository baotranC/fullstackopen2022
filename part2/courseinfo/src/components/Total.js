import React from 'react'

const Total = (props) => {
    const total = props.course.parts.reduce((accumulator, current) => accumulator + current.exercises, 0)
    return (
        <strong>total of {total} exercices</strong>
    )
}

export default Total