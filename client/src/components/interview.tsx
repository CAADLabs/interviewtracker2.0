import React, {useState} from 'react'


type Props = {}

const Interview = (props: Props) => {
  const [businessName, setbusinessName] = useState<string>('')
  const [role, setrole] = useState<string>('')
  const [date, setdate] = useState<string>('')
  const [type, settype] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [round, setround] = useState<number>()
  const [followUp, setfollowUp] = useState<boolean>()
  const [postingURL, setPostingURL] = useState<string>('')
  const [offer, setOffer] = useState<number>()
  const [notes, setNotes] = useState<string>('')

  return (
    <div className="interviewForm" >
        <form>
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
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <label>Add Posting URL</label>
          <input
            type="text"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <label>Offer Amount</label>
          <input
            type="text"
            placeholder='Enter a number'
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <label>Notes</label>
          <input
            type="text"
    
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
        </form>
    </div>
  )
}

export default Interview

/*
export interface Interview {
  id?: number;
  business_id: string;
  role: string;
  date: Date;
  type: string;
  status: string;
  round?: number;
  follow_up?: boolean;
  job_posting_url: string;
  offer?: number;
  notes?: string;
  interviewer_id?: number,
  user_id?: number
}
*/