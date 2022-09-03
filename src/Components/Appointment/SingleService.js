import React from 'react';

const SingleService = ({ service, setTreatment, bookSlot,duration }) => {

    // const duration = 30;

    // console.log(service);
    const { start, end } = service;
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

    var day_name = days[d.getDay()];
    var month_name = months[d.getMonth()];

    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl rounded-2xl px-5 py-3 font-bold">
            <div className="card-body  flex  items-center  justify-between  ">

                <div className='flex flex-col md:flex-row items-center gap-5 '>
                    <p className='text-[#06807e]'>{day_name}</p>
                    <p>{duration} min</p>
                </div>


                <div className='bg-[#d3efed] flex items-center gap-5 px-5 rounded-2xl py-2'>


                    <div className='flex items-center gap-2'>
                        <p>{S_hour}</p>
                        :
                        <p>{S_min}</p>
                    </div>
                    <p>-</p>
                    <div className='flex items-center gap-2'>
                        <p>{E_hour}</p>
                        :
                        <p>{E_min}</p>
                    </div>

                </div>

                <button onClick={() => bookSlot(service)} className=' my-2 text-white border px-5 py-2 bg-[#06807e] rounded-2xl active:bg-[#11aeac] '>Book</button>


            </div>
        </div>
    );
};

export default SingleService;