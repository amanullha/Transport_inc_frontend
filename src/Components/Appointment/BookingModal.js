import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';



const BookingModal = ({ treatment, date, setTreatment, refetch }) => {


    const { _id, name, slots } = treatment;
    const [user, loading] = useAuthState(auth);

    const formateDate = format(date, 'PP');

    if (loading) {
        return <loading />
    }
    const handleBooking = (e) => {
        e.preventDefault();

        const slot = e.target.slot.value;
        console.log(slot);

        const bookingData = {

            treatmentId: _id,
            treatmentName: name,
            date: formateDate,
            slot,
            patient: user?.email,
            patientName: user.displayName,
            phone: e.target.phone.value
        }



        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(data => {

                if (data?.success) {
                    toast.success(`Appointment is set, ${formateDate} at ${slot} `);

                }
                else if (!data?.success && data?.booking) {

                    toast.warning(`You have already taken appointment, ${formateDate} at ${slot} for ${name}`);

                }




            })






        refetch();
        setTreatment(null);
    }

    return (
        <div>

            {/* <label htmlFor="my-modal-6" className="btn modal-button">open modal</label> */}

            <input type="checkbox" id="booking-modal" className="modal-toggle" />

            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">


                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className="text-center font-bold text-2xl text-secondary">Booking for : {name}</h3>

                    <form onSubmit={handleBooking} className='flex flex-col gap-3 my-8 justify-center items-center'>

                        <input name='date' type="text" placeholder="Date" className="input input-bordered w-full max-w-xs " disabled value={format(date, 'PP')} />

                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, index) => <option key={index}>{slot}</option>)
                            }
                        </select>


                        <input name="name" type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" value={user?.displayName || ''} disabled />

                        <input name='email' type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" value={user?.email || ''} disabled />

                        <input name='phone' type="number" placeholder="Phone" className="input input-bordered w-full max-w-xs" />



                        <input type="submit" placeholder="Time" className="btn btn-secondary input input-bordered w-full max-w-xs" />
                    </form>




                    {/* <div className="modal-action">
                        <label htmlFor="booking-modal" className="btn">BOOK</label>
                    </div> */}


                </div>
            </div>





        </div>
    );
};

export default BookingModal;