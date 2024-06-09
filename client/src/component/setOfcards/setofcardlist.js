import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
// import EditSetCards from '../../pages/EditSetCards';
import Set from './setofcard';
function SetCard({ Cardstheme, auth, del }) {
  // let navigate = useNavigate();
  // const [hide, setHide] = useState(true);
  if (auth) {
    return (
      <div>
        {
          Cardstheme.map((value, key) => {
            return (
              // <div className='setofcards'>
              //   <ul className='display'>
              //     <button className='deletesetcard' onClick={(e) => { del(e, value.id) }}>
              //       X
              //     </button>
              //     {hide?(
              //     <li key={value.id} onClick={() => { navigate(`/setofcards/${value.id}`); }}>
              //       {value.name}
              //       <button className='editsetcards' onClick={(e) => { e.stopPropagation(); setHide(!hide); }}>{hide?<>&#128393;</>:null}</button>
              //     </li>):<EditSetCards name={value.name} id={value.id} hide={hide} setHide={setHide}  />}
              //   </ul>
              // </div>
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