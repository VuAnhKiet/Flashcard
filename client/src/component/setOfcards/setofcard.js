import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
function SetCard({ Cardstheme }) {
  let navigate = useNavigate();

  return (
    <div>
      {
        Cardstheme.map((value, key) => {
          return (
            <div className='setofcards'>
              <ul>
                <li key={value.id} onClick={() => { navigate(`/setofcards/${value.id}`) }}>{value.name}</li>
              </ul>
            </div>
          );
        })
      }
    </div>
  );
}

export default SetCard