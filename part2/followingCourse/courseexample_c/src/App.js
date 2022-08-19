import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // (step2) The following function is executed 
    // immediately after rendering.
  const hook = () => {
    console.log('effect')
    // promise
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        // (step3) When data arrives from the server, print:
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }  
  useEffect(hook, [])

  // (step1) The body of the function defining 
  // the component is executed and the component 
  // is rendered for the first time.

  // (step4) a call to a state-updating function triggers 
  // the re-rendering of the component
  console.log('render', notes.length, 'notes')


  /// Another way to write the effect function ///
  // useEffect(() => {
  //   console.log('effect')
  
  //   const eventHandler = response => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data)
  //   }
  
  //   const promise = axios.get('http://localhost:3001/notes')
  //   promise.then(eventHandler)
  // }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App