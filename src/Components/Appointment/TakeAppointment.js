import React, { useState } from 'react';
import AppointmentBanner from '../Appointment/AppointmentBanner';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import AvailableAppointment from './AvailableAppointment';



const TakeAppointment = () => {
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = useState(30);

    console.log("date: ", date);

    return (
        <div className='hero'>
            <div className="hero-content">




                <AppointmentBanner date={date} setDate={setDate} duration={duration} setDuration={setDuration} />

                <AvailableAppointment date={date} duration={duration} />
            </div>
        </div>
    );
};

export default TakeAppointment;