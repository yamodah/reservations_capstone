import React,{useState} from 'react'
import { listReservations } from '../utils/api';
import ReservationsTable from './ReservationsTable'

function Search() {
    const [number, setNumber]=useState("")
    const [reservations,setReservations]=useState([])
    const handleChange = (e) => {
        setNumber(e.target.value);
      };
    const handleSearch = (e)=> {
        e.preventDefault()
        const AC = new AbortController()
        listReservations({mobile_number:number},AC.signal).then((setReservations)).then(()=>setNumber(""))
          .catch(console.error)
    }
    return (
        <div>
        <form onSubmit={handleSearch}>
        <div className="mb-3">
           <input id="mobile_number"type="text" value={number} onChange={handleChange} name="mobile_number"/>
           <button type="Submit" className=''>Find</button>
        </div>
        </form>
           <ReservationsTable reservations={reservations}/>
           {!reservations.length && <h3>No reservations found</h3>}
        </div>
    )
}

export default Search
