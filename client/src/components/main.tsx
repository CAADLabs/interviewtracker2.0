import React from 'react';
import { Modal } from 'react-responsive-modal';
import { useState, useEffect, useContext } from 'react';
import { userContext } from '../../App';
// component imports

import Interview from './interview';

// main dashboard component

const Main: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { username, setusername }: any = useContext(userContext);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const upcoming: any = [];
  const followup: any = [];
  const complete: any = [];

  const getInterviews = async () => {
    try {
      const response = await fetch('/api/interviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
        }),
      });
      console.log(
        `This is the response to get all posted interviews ${response}`
      );
      // response.forEach(el => {
      //   if (el.status === 'upcoming') upcoming.push(el)
      // })
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="modal">
        <Modal open={open} onClose={closeModal} center>
          <Interview />
        </Modal>
      </div>
      <div className="trackerBoxes">
        <h1>INTERVIEW TRACKER</h1>
        <p>Hello {username}</p>
        <button onClick={openModal} className="newInterviewButton">
          Add New Interview{' '}
        </button>
        <div className="progressDiv">
          <div className="box">
            <h2>Upcoming</h2>
            <div>
              {/* {upcoming.map((el: any) => {
              <button> Company: {el.business_name}</button>
            })} */}
            </div>
          </div>
          <div className="box">
            <h2>Follow Ups</h2>
            <div>
              {/* {followup.map((el: any) => {
            <button> Company: {el.business_name}</button>
          })} */}
            </div>
          </div>
          <div className="box">
            <h2>Completed</h2>
            <div>
              {/* {complete.map((el: any) => {
            <button> Company: {el.business_name}</button>
          })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
