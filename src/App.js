import React, { useState,useEffect } from 'react'
import Names from './Names'
import Filter from './Filter'
import Services from './services/books'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    Services
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const deletePersons = id => {
    const data = persons.find(p => p.id === id)
    
    if ( window.confirm(`Delete ${data.name}?`) ){
      Services
      .remove(id)
      .then( res => {
        setPersons(persons.filter(p => p !== data))
        console.log(res)
      })
    }

  }

  const addNames = (event) => {
    event.preventDefault()
    const newObject = {
        name: newName,
        number: newNumber
    }

    if (persons.some(event => event.name === newName)) {
      const locate = persons.find( p => p.name === newName)
      console.log(locate.id)
      
      if ( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ){
        Services
          .update(locate.id, newObject)
          .then(() => { setPersons(persons.map(p => p.name === newName ? Object.assign(locate, newObject) : p )) 
          console.log(Object.assign(locate, newObject))})
      }
    }

    else {  
    Services
      .create(newObject)
      .then(res => {
        setPersons(persons.concat(res))
        setNewName('')
        setNewNumber('')
        console.log(res)
      })

    }
        /* axios
      .post(baseUrl, newObject)
      .then(res => {
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
      }) */
    
    
      
  
}


const showFilterName = filterName === '' ? persons : persons.filter(x => x.name.toLowerCase().includes(filterName.toLowerCase()))


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
      
  {showFilterName.map(nNames => 
  <Names 
  key={nNames.id} 
  persons={nNames} 
  deletePersons= {() => deletePersons(nNames.id)}
  />)}

     
    </div>
  )
}

export default App
