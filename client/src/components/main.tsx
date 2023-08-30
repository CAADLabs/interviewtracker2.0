import React from "react";
import { Modal } from 'react-responsive-modal';
import { useState, useEffect, useContext } from "react";
import {
  userContext
} from '../../App'
// component imports

import Interview from './interview'


// main dashboard component

const Main: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { username, setusername }: any = useContext(userContext);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
     <div className="modal"> 
        <Modal open={open} onClose={closeModal} center>
            <Interview/>
        </Modal>
      </div>
    <div className="trackerBoxes">
      <h1>INTERVIEW TRACKER</h1>
      <p>Hello {username}</p>
      <button onClick={openModal} className="newInterviewButton">Add  New Interview </button>
      <div className='progressDiv'>
        <div className="box">
          <h2>Upcoming</h2>
        </div>
        <div className="box">
          <h2>Follow Ups</h2>
        </div>
        <div className="box">
          <h2>Completed</h2>
        </div>
      </div>
    </div>
    </>
  );
};

export default Main;
