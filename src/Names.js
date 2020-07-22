import React from 'react'


const Names = ({ persons, deletePersons }) =>(
    <div>
    {persons.name} {persons.number}
    <button onClick = {deletePersons}>delete</button>
    </div>
)

export default Names