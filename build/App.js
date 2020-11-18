import React, { useState } from 'react'
//import ReactDOM from 'react-dom';
//import reportWebVitals from './reportWebVitals';
//import { Text, TextInput, View } from 'react-native';
import ShowPersons from './components/ShowPersons.js';
import PersonForm from './components/PersonForm.js';



const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

   // const persons2 = persons
   // const result = ''
    
  const [found, setFound] = useState( { name: 'Aa', number: '040-123456' })
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFind, setNewFind ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()  
    const newPerson = { 
      name: newName, 
      number: newNumber,
    }

    if(persons.some(person => person.name === newName)) 
    {
        window.alert('$newName is already added to phonebook') 
        console.log('button clicked alert', event.target)
    }else
    {
        setPersons(persons.concat(newPerson))
      //  setPersons(persons2.concat(newPerson))
        setNewName('')
        setNewNumber('')
      //  persons2 = persons
        console.log('button clicked', event.target)
    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFindChange = (event) => {
    event.preventDefault() 
    console.log(event.target.value)
    setNewFind(event.target.value)
    //const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
   // if (newFind != '') return persons2.filter(person => person.includes(newFind)); else return persons;
    //const result = persons2.filter(person => person.includes(newFind));
   // console.log('result' + result)
   // console.log('newfind' + newFind)
   // console.log(result);
    // expected output: Array ["exuberant", "destruction", "present"]
     
    
  }

  return (
    <div>
      <h2>Phonebook persons = {persons} newName = {newName} newNumber = {newNumber} </h2>
      <PersonForm  />
      <form onSubmit={addPerson} >
        <div>
          filter shown with        
           <input              
              onChange={handleFindChange}
        />
        </div>
        <div>
          name:        
           <input              
              onChange={handleNameChange}
        />
        </div>
        <div>
          number: 
          <input  
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>  
      <ShowPersons persons = {persons} />   
    </div>  
  )
}

export default App
