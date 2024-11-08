import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EditSetCards from './EditSetCards';

function SetCard({ setcardProps }) {
    const { value, del, drag, edit } = setcardProps;
    const [hideset, setHideset] = useState(true);
    let navigate = useNavigate();
    const [newname, setNewname] = useState(value.name)
    return (
        <div className='setofcards' draggable onDragStart={() => drag(value)}>
            <ul className='display'>
                {hideset && (
                    <button className='deletesetcard' onClick={(e) => { del(e, value.id) }}>
                        X
                    </button>)}
                {hideset ? (
                    <li key={value.id} onClick={() => navigate(`/setofcards/${value.id}`)}>
                        {newname}
                        <button
                            className='editsetcards'
                            onClick={(e) => {
                                e.stopPropagation();
                                setHideset(!hideset);
                            }}
                        >
                            {hideset ? <>&#128393;</> : null}
                        </button>
                    </li>
                ) :
                    <EditSetCards
                        name={value.name}
                        id={value.id}
                        hide={hideset}
                        setHide={setHideset}
                        setName={setNewname}
                        edit={edit}
                    />
                }
            </ul>
        </div>
    )
}

export default SetCard