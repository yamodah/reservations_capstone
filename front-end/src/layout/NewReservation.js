import React, { useState }  from 'react'

function NewReservation() {
    const [form, setform] = useState({...initialFormState})
    const initialFormState = {
        first_name:"",
        last_name:"",
        mobile_number:"",
        reservation_date:"",
        reservation_time:"",
        people:"",
    }

    return (
        <div>

        </div>
    )
}

export default NewReservation
