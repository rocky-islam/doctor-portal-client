import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({treatment, setTreatment, selectedDate}) => {
    const {name, slots} = treatment;
    const date = format(selectedDate, 'PP');

    const handleBooking = event =>{
        event.preventDefault();
        const form = event.target;
        const slot= form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking ={
            appointmentDate: date,
            treatment: treatment.name,
            patient: name,
            slot,
            email,
            phone
        }

        console.log(booking);
        console.log(date, slot, name, email, phone);

        setTreatment(null)
        
    }

    return (
      <div>
        <input type="checkbox" id="booking-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="booking-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">{name}</h3>
            <form onSubmit={handleBooking} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                value={date}
                className="input input-bordered"
                disabled
              />
              <select name="slot" className="select select-bordered w-full">
                {slots.map((slot, i) => (
                  <option 
                  value={slot}
                  key={i}
                  >{slot}</option>
                ))}
              </select>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
              />
              <input
                name="email"
                type="text"
                placeholder="Email Address"
                className="input input-bordered"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="input input-bordered"
              />
              <br />
              <input
                className="w-full  btn btn-accent"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
};

export default BookingModal;