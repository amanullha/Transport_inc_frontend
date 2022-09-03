import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
// import BookingModal from './BookingModal';
import SingleService from './SingleService';


const AvailableAppointment = ({ date, duration }) => {


    const [treatment, setTreatment] = useState(null);

    const formateDate = format(date, 'PP');

    const { data: services, isLoading, refetch } = useQuery(['available', formateDate, duration], () => fetch(`http://localhost:5000/get-booking?duration=${duration}&date=${date}`)
        .then(res => res?.json())

    )
    // console.log("slots: ", services);


    console.log(services);
    if (isLoading) {
        return <p>Loading...</p>
    }


    const bookSlot = (slotService) => {



        const { start, end } = slotService;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



        const d = new Date(start);
        const S_year = d.getFullYear()
        const S_date = d.getDate()
        const S_day = d.getDay()
        const S_month = d.getMonth()
        const S_hour = d.getUTCHours()
        const S_min = d.getUTCMinutes()
        const S_sec = d.getUTCSeconds()


        const dd = new Date(end);

        const E_year = dd.getFullYear()
        const E_date = dd.getDate()
        const E_day = dd.getDay()
        const E_month = dd.getMonth()
        const E_hour = dd.getUTCHours()
        const E_min = dd.getUTCMinutes()
        const E_sec = dd.getUTCSeconds()

        let day_name = days[d.getDay()];
        let month_name = months[d.getMonth()];





        fetch('http://localhost:5000/booking-slot', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(slotService)
        })
            .then(res => res.json())
            .then(data => {
                console.log("book data: ",data);

                if (data?.success) {
                    toast.success(`Slot booked at ${S_hour}:${S_min} - ${E_hour}:${E_min}`);

                }
                else if (!data?.success) {

                    toast.warning(`Already booked this slot`);

                }




            })

        refetch();


    }




    return (
        <div className='mx-5 flex justify-center flex-col'>
            <h1 className='text-2xl text-primary text-center my-12'>Available Appointments on :  {format(date, 'PP')}</h1>

            <div className='mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                {
                    services?.map(service => <SingleService
                        key={service?._id}
                        service={service}
                        // setTreatment={setTreatment}
                        bookSlot={bookSlot}
                        duration={duration}
                    ></SingleService>)
                }
            </div>

            {/* {treatment && <BookingModal refetch={refetch} date={date} treatment={treatment} setTreatment={setTreatment} />} */}


        </div>
    );
};

export default AvailableAppointment;