import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Names from './Names'
import Filter from './Filter'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const addNames = (event) => {
    event.preventDefault()
    const newObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
    }
    if (persons.some(event => event.name === newName)) {
      return (
        alert(`${newName} is already added to phonebook.`)
      )
    }
  setPersons(persons.concat(newObject))
  console.log(persons.map(person => person.name))
  setNewName('')
  setNewNumber('')
  
}


const showFilterName = filterName === '' ? persons : persons.filter(x => x.name.toLowerCase().includes(filterName))


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
 
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
  
      <div>
        <Filter filter={filterName} handler={handleFilterName} />
      </div>
    

      <form onSubmit={addNames}>
      
        <h3>add a new</h3>
        <div>
          name: <input value = {newName} onChange= {handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange = {handleNumberChange} />
        </div>
        <div>debug: {}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
  {showFilterName.map(nNames => <Names key={nNames.id} persons={nNames} />)}

     
    </div>
  )
}

export default App
