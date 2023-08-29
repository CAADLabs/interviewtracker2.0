import React from "react";

const  Main: React.FC = () => {
  return (
    <div className='trackerBoxes'>
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
  )
}


export default Main;