import React from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import FriendsSearch from '../component/friends/SearchFriend';

function NavBar({ Logout, auth }) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="container">
                <div className="nav">
                    <a className="homebtn" href="/">
                        <h1>Flashcards</h1>
                    </a>

                    {auth && <FriendsSearch />}

                    <div className="buttonss">
                        <button className="navbut" onClick={() => navigate('/')}>
                            Home
                        </button>

                        {!auth ? (
                            <button className="navbut" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        ) : (
                            <button className="navbut" onClick={Logout}>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
