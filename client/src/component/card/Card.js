import { useState} from "react";
import EditCard from "./EditCard";

function Card({ card, del, edit }) {
    const [flip, setFlip] = useState(true);
    const [hide, setHide] = useState(true);
    const [newword, setNewword] = useState(card.word);
    const [newdef, setNewdef] = useState(card.definition);

    const editCardProps = {
        onClick: (e) => { e.stopPropagation(); },
        word: newword,
        cardId: card.id,
        definition: newdef,
        state: hide,
        setword: setNewword,
        setdef: setNewdef,
        setState: setHide
    };

    return (
        <div className='flashcard' onClick={() => { setFlip(!flip) }}>
            <button className='delete' onClick={(e) => { del(e, card.id); }}>
                X
            </button>
            {hide ? (
                flip ? <div className='word'>{newword}</div>
                    : <div className='defination'>{newdef}</div>) :
                <EditCard
                    {...editCardProps}
                />
            }
            <button className='editcard'
                onClick={(e) => {
                    edit(e, card.id);
                    setHide(!hide);
                }}
            >
                {hide ? <>Edit</> : null}
            </button>
        </div>
    );
}

export default Card;