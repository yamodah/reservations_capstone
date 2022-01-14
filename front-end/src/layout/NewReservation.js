import React, { useState }  from 'react'

function NewReservation() {
    const date = new Date()
    const initialFormState = {
        first_name:"",
        last_name:"",
        mobile_number:"",
        reservation_date:date.getDate(),
        reservation_time:date.getTime(),
        people:"",
    }
    const [form, setForm] = useState({...initialFormState})
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.id]: e.target.value,
        });
      };
    return (
        <div>
            <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label"  >First Name</label>
                <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Last Name</label>
                <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Mobile Number</label>
                <input type="text" className="form-control" id="mobile_number" name="mobile_number"placeholder="First Name"  value={form.mobile_number} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Date</label>
                <input type="date" className="form-control" id="reservation_date" name="reservation_date"value={form.reservation_date} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Time</label>
                <input type="date" className="form-control" id="reservation_time" name="reservation_time" value={form.reservation_time} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Date</label>
                <input type="date" className="form-control" id="people" name="people"value={form.reservation_date} onChange={handleChange}/>
            </div>

        </div>
    )
}

export default NewReservation
