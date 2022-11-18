import React from 'react';

const AppointmentOption = ({option}) => {
    const {name, slots} = option;
    return (
      <section>
        <div className="card shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title text-primary justify-center">{name}</h2>
            <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
            <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary text-white">Book Appointment</button>
            </div>
          </div>
        </div>
      </section>
    );
};

export default AppointmentOption;