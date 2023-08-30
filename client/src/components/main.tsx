import React from "react";
import { Modal } from 'react-responsive-modal';
import { useState, useEffect } from "react";

// component imports

import Interview from './interview'

// main dashboard component

const Main: React.FC = () => {
  const [open, setOpen] = useState(false);
  
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
      <h1>Interview Tracker</h1>
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
