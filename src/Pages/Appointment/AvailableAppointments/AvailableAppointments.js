import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);

    const date = format(selectedDate, 'PP');

    const { data:appointmentOptions =[]} = useQuery({
      queryKey: ["appointmentOptions", date],
      queryFn: ()=> fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
      .then((res) => res.json())
    });

    // useEffect( () =>{
    //     fetch("http://localhost:5000/appointmentOptions")
    //       .then((res) => res.json())
    //       .then((data) => setAppointmentOptions(data));
    // },[])

  return (
    <section className="mt-16">
      <p className="text-center text-secondary font-bold">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-12">
        {appointmentOptions?.map((option) => (
          <AppointmentOption
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          key={treatment?._id}
          selectedDate={selectedDate}
          treatment={treatment}
          setTreatment={setTreatment}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointments;