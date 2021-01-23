import React from 'react'

const Note = ({note}) => {

    return <div>{note.created_at}{note.text}</div>

}

export default Note
