import React,{useState} from 'react'
import Set from './setofcard';

function SetCard({ Cardstheme, auth, del }) {
  if (auth) {
    return (
      <div>
        {
          Cardstheme.map((value, key) => {
            return (
              <Set key={value.id} value={value} del={del} />
            );
          })
        }
      </div>
    );
  }
  else { return <div></div> }
}

export default SetCard