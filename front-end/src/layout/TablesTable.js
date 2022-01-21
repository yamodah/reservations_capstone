import React from 'react'
import {useHistory} from "react-router-dom"
import { clearTable } from '../utils/api';

function TablesTable({tables}) {
    const history = useHistory()
    const handleClear = (table_id)=>{
        if (
            window.confirm(
              "would you like to clear this table?"
            )
          ) {
            const AC = new AbortController();
            clearTable({table_id}, AC.signal).then(()=>history.push("/"));
            return () => AC.abort();
          }

    }
    const reservationsRows = tables.map(({reservation_id, table_id,capacity, table_name})=>{
        return(
            <tr key={table_id}>
            <th scope="row">{table_name}</th>
            <td>{capacity}</td>
            <td data-table-id-status={table_id}>{reservation_id?"Occupied":"Free"}</td>
            <button onClick={()=>handleClear(table_id)}>clearTable</button>
            </tr>
        )
    })
    return (
        <table class="table">
        <thead class="thead-light">
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
            {reservationsRows}
        </tbody>
        </table>
    )
}

export default TablesTable
