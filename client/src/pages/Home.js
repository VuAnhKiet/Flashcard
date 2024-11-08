import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import CreateSetCard from '../component/setcard/CreateSetCard';
import Friends from './Friends';

// Context
import AuthContext from '../AuthContext';

// Custom Hooks
import { useShare } from '../hooks/useShareCards';

function Home() {
  const { auth } = useContext(AuthContext);  // Getting 'auth' state from AuthContext
  const share = useShare(auth);  // Custom hook to handle sharing

  return (
    <div>
      <CreateSetCard share={share} />
      {auth ? <Friends share={share} /> : <div />}
    </div>
  );
}

export default Home;
