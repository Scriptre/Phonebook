import React from 'react'

const Notification = ( { message, condition} ) => {
    if (condition !== false){
    
        return (
            <div className='success'>
                {message}
            </div>
        )
    }

    else {
        return (
            <div className='failure'>
                {message}
            </div>
        )
    }

    
} 

export default Notification