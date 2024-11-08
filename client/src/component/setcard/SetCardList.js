import React from 'react'
import SetCard from './SetCard';

function SetCardList({ setcardProps }) {
  const { cardstheme, auth } = setcardProps;
  if (auth) {
    return (
      <div className='list-set'>
        {
          cardstheme.map((value, key) => {
            return (
              <SetCard key={value.id} setcardProps={{ ...setcardProps, value }} />
            );
          })
        }
      </div>
    );
  }
  else {
    return <div></div>
  }
}

export default SetCardList