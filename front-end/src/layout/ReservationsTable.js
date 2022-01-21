import React from 'react'

function ReservationsTable({reservations}) {
    const reservationsRows = reservations.map(({reservation_id, first_name,last_name, mobile_number, reservation_date, reservation_time,people, status})=>{
        return(
            <tr key={reservation_id}>
            <th scope="row">{reservation_id}</th>
            <td>{last_name},{first_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
            <td>{status}</td>
            {status==="booked"?
            <td><button>Seat</button>
            <button>Edit</button>
            <button>Cancel</button></td>
            :null}
            </tr>
        )
    })
    return (
        <table className="table" >
        <thead className="thead-light">
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {reservationsRows}
        </tbody>
        </table>
    )
}

export default ReservationsTable
