import { fromPairs } from 'lodash'
import React from 'react'
import { nl2br } from '../functions'

const Note = ({ note }) => {

    return <div>{nl2br(note.text)}</div>

}

export default Note
