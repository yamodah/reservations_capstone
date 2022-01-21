import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import { createTable } from '../utils/api'
import ErrorAlert from './ErrorAlert'
function NewTable() {
    const history = useHistory()
    const initialFormState = {
        table_name:"",
        capacity:0
    }
    const [form, setForm] = useState({...initialFormState})
    const [error, setError] = useState(null)
    const handleSubmission =async (e)=>{
        e.preventDefault()
        const AC = new AbortController()
        createTable(form,AC.signal)
        .then(()=>history.push("/"))
        .catch(setError)

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
    return (
        <form onSubmit={handleSubmission}>
            <ErrorAlert error={error}/>
            <div className="mb-3">
                <label htmlFor="table_name" className="form-label"  >Table Name</label>
                <input type="text" className="form-control" id="table_name" name="table_name" placeholder="Table Name" value={form.table_name} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="capacity" className="form-label">Capacity</label>
                <input type="number" className="form-control" id="capacity" name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleNumberChange} required/>
            </div>
            <button onClick={(e)=>{
                e.preventDefault()
                history.goBack()}}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    )
}

export default NewTable
