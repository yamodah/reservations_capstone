import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router'
import { readReservation, updateReservation } from '../utils/api'
import ReservationForm from './ReservationForm'

function EditReservation() {
    const history = useHistory()
    const {reservation_id} = useParams()
    const [form, setForm] = useState(null)
    const [error, setError] = useState(null);

    useEffect(loadReservation,[reservation_id])

    function loadReservation(){
        const abortController = new AbortController();
        setError(null);
        readReservation(reservation_id, abortController.signal)
          .then(setForm)
          .catch(setError);
        return () => abortController.abort();
      }
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
      };
      const handleSubmission =async (e)=>{
          e.preventDefault()
          const AC = new AbortController()
          updateReservation(form,AC.signal)
          .then(()=>history.goBack())
          .catch(setError)
      }
      
    return (
        <ReservationForm handleSubmission={handleSubmission} handleChange={handleChange} error={error} handleNumberChange={handleNumberChange} form={form}/>
    )
}

export default EditReservation
