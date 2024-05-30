import React from 'react'
import Flashcardlist from './flashcard_list';


function Card({ ListOfCards }) {
  return (
    <div><Flashcardlist flashcards={ListOfCards}></Flashcardlist></div>
  )
}

export default Card