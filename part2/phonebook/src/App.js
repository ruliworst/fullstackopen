import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/personService.js'

const App = () => {
  useEffect(() => {
    personService
      .getAll()
      .then(fetchedPersons => {
        setPersons(fetchedPersons)
        setFilteredPersons(fetchedPersons)
      })
  }, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const localFilter = event.target.value.toLowerCase()
    setFilter(localFilter)
    if(localFilter === '') setFilteredPersons(persons)

    let filteredPersons = []

    persons.forEach(person => {
      if(person.name.toLowerCase().includes(localFilter)) {
        filteredPersons.push(person)
      }
    })
    setFilteredPersons(filteredPersons)
  }

  const deletePerson = (id) => {
    const personToDelete = persons.filter(person => person.id === id)[0]

    personService
      .deletePerson(personToDelete.id)
      .then(deletedPerson => console.log(deletedPerson))
    
    let updatedFilteredPersons = filteredPersons.filter(person => person.id !== personToDelete.id)
    setFilteredPersons(updatedFilteredPersons)
    setMessage(`Deleted ${personToDelete.name}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const personToChange = persons.filter(person => person.name === newName)[0]

    if(JSON.stringify(persons).includes(JSON.stringify(newPerson.name))) {
      if(personToChange.number !== newNumber) {
        personService
          .update(personToChange.id, {...personToChange, number: newNumber})
          .then(changedPerson => {
            setNewName('')
            setNewNumber('')
            let updatedFilteredPersons = filteredPersons.map(person => personToChange.id !== person.id ? person : changedPerson)
            setFilteredPersons(updatedFilteredPersons)
            setMessage(`${newPerson.name}'s number has changed.`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(error => {
            setMessage(`Information of ${personToChange.name} has already been removed from the server.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        return;
      } else {
        alert(`${newPerson.name} is already added to phonebook`)
        return;
      }
    }

    if(newName !== '' && newNumber !== '') {
      setPersons([...persons, newPerson])
      if(filter === '' || newName.toLowerCase().includes(filter.toLowerCase())) {
        setFilteredPersons([...filteredPersons, newPerson])
      }
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${newPerson.name}`)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App