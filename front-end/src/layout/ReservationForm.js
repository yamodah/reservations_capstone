import React, { useState }  from 'react'
import { useHistory } from 'react-router-dom'
import {asDateString} from "../utils/date-time"
import { createReservation } from "../utils/api.js"
import ErrorAlert from './ErrorAlert'
function ReservationForm() {
    const date = new Date()
    const history = useHistory()
    const initialFormState = {
        first_name:"",
        last_name:"",
        mobile_number:"",
        reservation_date:asDateString(date),
        reservation_time:date.toTimeString().slice(0,5),
        people:"",
    }

    const [form, setForm] = useState({...initialFormState})
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.id]: e.target.value,
        });
      };
      const handleNumberChange = (e) => {
        setForm({
          ...form,
          [e.target.id]: Number(e.target.value),
        });
        // console.log( typeof Number(e.target.value))
      };
      const handleSubmission =async (e)=>{
          e.preventDefault()
          const AC = new AbortController()
          createReservation(form,AC.signal)
          .then(()=>history.push(`/dashboard?date=${form.reservation_date}`))
          .catch(setError)

      }
    return (
        <form onSubmit={handleSubmission}>
            <ErrorAlert error={error}/>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label"  >First Name</label>
                <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Mobile Number</label>
                <input type="text" className="form-control" id="mobile_number" name="mobile_number"placeholder="Mobile Number"  value={form.mobile_number} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Date</label>
                <input type="date" className="form-control" id="reservation_date" name="reservation_date"value={form.reservation_date} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Time</label>
                <input type="time" className="form-control" id="reservation_time" name="reservation_time" value={form.reservation_time} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">People</label>
                <input type="number" className="form-control" id="people" name="people"value={form.people} onChange={handleNumberChange} min={1} required/>
            </div>
            <button onClick={(e)=>{
                e.preventDefault()
                history.goBack()}}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    )
}

export default ReservationForm
