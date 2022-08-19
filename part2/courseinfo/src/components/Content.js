import React from 'react'
import Part from './Part'

const Content = (props) => {
    const parts = props.course.parts.map((p, index) => <Part key={index} part={p.name} exercise={p.exercises} />)

    return (
        <div>
            {parts}
        </div>
    )
}

export default Content