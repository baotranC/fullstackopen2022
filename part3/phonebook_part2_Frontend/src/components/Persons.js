const Persons = ({ deletePerson, personsToShow }) => {
    return (
        <ul>
            {personsToShow
                .map(person =>
                    <li key={person.id}>{person.name} {person.number}
                        <button onClick={() => deletePerson(person)}>delete</button>
                    </li>)}
        </ul>
    )
}

export default Persons