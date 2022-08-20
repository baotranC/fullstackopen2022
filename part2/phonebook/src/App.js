import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState({ message: null, type: null })

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personInPhonebook = persons.find(person => person.name === newName)

    if (personInPhonebook) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old numver with a new one?`)) {
        const nameObject = {
          name: newName,
          number: newNumber
        }

        personService.update(personInPhonebook.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personInPhonebook.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setStatus(
              {
                message: `Updated ${returnedPerson.name}`,
                type: 'successful'
              }
            )
            setTimeout(() => {
              setStatus({ message: null, type: null })
            }, 5000)
          }).catch(error => {
            setStatus(
              {
                message: `the person '${personInPhonebook.name}' was already deleted from server`,
                type: 'error'
              }
            )
            setTimeout(() => {
              setStatus({ message: null, type: null })
            }, 5000)
            setPersons(persons.filter(person => person.id !== personInPhonebook.id))
          })
      }
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService.create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setStatus(
            {
              message: `Added ${returnedPerson.name}`,
              type: 'successful'
            }
          )
          setTimeout(() => {
            setStatus({ message: null, type: null })
          }, 5000)
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .then(
          setPersons(persons.filter(p => p.id !== person.id))
        ).catch(error => {
          setStatus(
            {
              message: `the person '${person.name}' was already deleted from server`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setStatus({ message: null, type: null })
          }, 5000)
        })
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <Notification message={status.message} type={status.type} />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>

      <h3>Numbers</h3>
      <Persons deletePerson={deletePerson} personsToShow={personsToShow}></Persons>
    </div>
  )
}

export default App