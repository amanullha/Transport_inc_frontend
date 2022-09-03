import React, { useRef } from 'react';
import pic1 from '../../Assets/pic1.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ date, setDate, duration, setDuration }) => {

    const cg = (flag) => {

        if ((duration === 30 && flag) || (duration === 1440 && !flag)) return;
        else if (flag) setDuration(duration - 1)
        else setDuration(duration + 1)

    }


    return (
        <div className=" py-16 flex justify-center">
            <div className=" flex justify-evenly items-center gap-5 flex-col-reverse md:flex-row">

                <div className='md:mr-12 '>
                    <div>
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={setDate}

                        />


                    </div>
                    <div className='flex items-center justify-evenly'>
                        <label>Duration: </label>

                        <button onClick={() => cg(true)} className='active:bg-blue-400 cursor-pointer shadow-3xl bg-slate-100 px-3 rounded-lg'>
                            -
                        </button>
                        <label>{duration} </label>

                        <button onClick={() => cg(!true)} className='active:bg-blue-400 cursor-pointer shadow-3xl bg-slate-100 px-3 rounded-lg'>
                            +
                        </button>
                        <label>minutes</label>

                    </div>
                </div >
                <img src={pic1} className="max-w-sm md:ml-12" />
            </div>
        </div>
    );
};

export default AppointmentBanner;