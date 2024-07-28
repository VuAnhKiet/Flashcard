import React from 'react'
import Flashcardlist from './flashcard_list';

function Card({ ListOfCards,del,edit,setlistcards }) {
  return (
    <div><Flashcardlist flashcards={ListOfCards} del={del} edit={edit}/></div>
  )
}

export default Card