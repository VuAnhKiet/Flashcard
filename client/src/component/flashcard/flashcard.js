import { useState } from "react";
import EditCard from "../../pages/EditCard";
function Flashcard({ card,del,edit,setlistcards }) {
    const [flip, setFlip] = useState(true);
    const [hide,setHide]=useState(true);
    const [newword,SetNewword]=useState(card.word);
    const [newdef,SetNewdef]=useState(card.defination);
    // const handleChange=()=>{
    //     setHide(!)
    // }
    return (
        <div className='flashcard'onClick={() => { setFlip(!flip) }}>
            <button className='delete' onClick={(e)=>{del(e,card.id)}}>
                X
            </button>
            {hide?(
            flip ? <div className='word'>{newword}</div>
                : <div className='defination'>{newdef}</div>):
                <EditCard onClick={(e)=>{e.stopPropagation();}} word={newword} id={card.id} defination={newdef} state={hide} setword={SetNewword} setdef={SetNewdef} setState={setHide}/>
            }
            <button className='editcard' onClick={(e)=>{edit(e,card.id);setHide(!hide);}}>{hide?<>Edit</>:null}
                
            </button>
        </div>
    );


}

export default Flashcard;