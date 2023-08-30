import React, { useState, createContext, useContext } from 'react'

import {
  userContext
} from '../../App'

type Props = {}

const Interview = (props: Props) => {
  // const currUser = useContext(userContext)
  const { username, setusername }: any = useContext(userContext);
  const [businessName, setbusinessName] = useState<string>('')
  const [role, setrole] = useState<string>('')
  const [date, setdate] = useState<string>('')
  const [type, settype] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [round, setround] = useState<number>()
  const [followUp, setfollowUp] = useState<any>()
  const [postingURL, setPostingURL] = useState<string>('')
  const [offer, setOffer] = useState<number>()
  const [notes, setNotes] = useState<string>('')
  const [interviewerName, setinterviewerName] = useState<string>('')
  
console.log(`testing username in interview ${username}`)


  const createInterview = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         date,
         business_name: businessName,
         type,
         follow_up: followUp,
         role,
         notes,
         status,
         round,
         offer,
         interviewer_name: interviewerName,
         user_name: username
        }),
      });
      console.log(response)
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="interviewForm" >
        <form onSubmit={createInterview}>
        <label>Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setbusinessName(e.target.value)}
          />
        <label>Inteviewer Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setrole(e.target.value)}
          />
          <label>Date of Interview</label>
          <input
            type="date"
            // placeholder={date}
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
          <label>Type of Interview</label>
          <input
            type="text"
            value={type}
            onChange={(e) => settype(e.target.value)}
          />
          <label>Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <label>Inteview #</label>
          <input
            type="text"
            value={round}
            onChange={(e) => setround(parseInt(e.target.value))}
          />
          <label>Was this a follow-up?</label>
          <input
            type="text"
            placeholder='true or false'
            value={followUp}
            onChange={(e) => setfollowUp(e.target.value)}
          />
          <label>Add Posting URL</label>
          <input
            type="text"
            value={postingURL}
            onChange={(e) => setPostingURL(e.target.value)}
          />
          <label>Offer Amount</label>
          <input
            type="text"
            placeholder='Enter a number'
            value={offer}
            onChange={(e) => setOffer(parseInt(e.target.value))}
          />
          <label>Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
            <label>Add Interviewer</label>
          <input
            type="text"
            value={interviewerName}
            onChange={(e) => setinterviewerName(e.target.value)}
          />
          <button type='submit'> Add Interview </button>
        </form>
    </div>
  )
}

export default Interview
