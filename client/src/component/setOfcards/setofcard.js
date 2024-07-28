import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EditSetCards from '../../pages/EditSetCards';

function Set({ value, del, key }) {
    const [hideset, setHideset] = useState(true);
    let navigate = useNavigate();
    const [newname, SetNewname] = useState(value.name)
    return (
        <div className='setofcards'>
            <ul className='display'>
                <button className='deletesetcard' onClick={(e) => { del(e, value.id) }}>
                    X
                </button>
                {hideset ? (
                    <li key={value.id} onClick={() => { navigate(`/setofcards/${value.id}`); }}>
                        {newname}
                        <button className='editsetcards' onClick={(e) => { e.stopPropagation(); setHideset(!hideset); }}>{hideset ? <>&#128393;</> : null}</button>
                    </li>) : <EditSetCards name={newname} id={value.id} hide={hideset} setHide={setHideset} setName={SetNewname} />}
            </ul>
        </div>
    )
}

export default Set