import { useState } from "react";

function Flashcard({ card }) {
    const [flip, setFlip] = useState(true);
    return (
        <div className='flashcard'onClick={() => { setFlip(!flip) }}>
            {flip ? <div className='word'>{card.word}</div>
                : <div className='defination'>{card.defination}</div>}

        </div>
    );


}

export default Flashcard;