import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {listTables, readReservation, updateTable} from "../utils/api"
import ErrorAlert from './ErrorAlert'
function SeatReservation() {
    const history = useHistory()
    const {reservation_id} = useParams
    const [tables, setTables] = useState([])
    const [chosenTable, setChosenTable]= useState({table_id:null})
    const [error, setError]= useState(null)
    // const [reservation, setReservation] = useState({})
    useEffect(loadTables,[])
    // useEffect(loadReservationData,[reservation_id])
    function loadTables(){
        const AC = new AbortController();
        listTables(AC.signal)
          .then(setTables)
          .catch(setError);
        return () => AC.abort();
      }
    //   function loadReservationData() {
    //     const abortController = new AbortController();
    //     setError(null);
    //     readReservation(reservation_id, abortController.signal)
    //       .then(setReservation)
    //       .catch(setError);
    //     return () => abortController.abort();
    //   }
      const handleChange = (e) => {
          setChosenTable({
            ...chosenTable,
            [e.target.id]: e.target.value,
          });
        };
      const handleSubmission =async (e)=>{
            e.preventDefault()
            const AC = new AbortController()
            updateTable({...chosenTable, reservation_id}, AC.signal)
            .then(()=>history.push("/"))
            .catch(setError)
        }

    const tableOptions = tables.map((table)=>{
        <option key={table.table_id} value={table.table_id}>
            {table.table_name} - {table.capacity}
        </option>
    })

    return (
        <form onSubmit={handleSubmission}>
            <ErrorAlert error={error}/>
            <div class="form-group">
                <label htmlFor="table_id">Choose a Table</label>
                <select class="form-control" id="table_id" onChange={handleChange}>
                    <option value="">** No Selection **</option>
                    {tables.length && tableOptions}
                </select>
             </div>
             <button onClick={(e)=>{
                e.preventDefault()
                history.goBack()}}>Cancel</button>
            <button type="submit" disabled={!chosenTable.table_id}>Submit</button>
        </form>
    )
}

export default SeatReservation
