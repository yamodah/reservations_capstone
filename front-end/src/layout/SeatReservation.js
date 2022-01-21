import React, {useState, useEffect} from 'react'
import {listTables} from "../utils/api"
function SeatReservation() {
    const [tables, setTables] = useState([])
    const [error, setError]= useState(null)
    useEffect(loadTables,[])
    function loadTables(){
        const AC = new AbortController();
        listTables(AC.signal)
          .then(setTables)
          .catch(setError);
        return () => AC.abort();
      }
    return (
        <form>
            
        </form>
    )
}

export default SeatReservation
