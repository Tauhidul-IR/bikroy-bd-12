import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const OpenProductModal = ({ bookingProduct, setBookingProduct }) => {
    const { user } = useContext(AuthContext);
    const { battery, categoryName, color, img, location, name, newPrice, price, ram, size, usedYear } = bookingProduct;

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const phone = form.phone.value;
        const meetingLocation = form.meetingLocation.value;


        const booking = {
            categoryName: categoryName,
            name: name,
            price,
            email,
            phone,
            meetingLocation: meetingLocation,
        }
        setBookingProduct(null)

    }



    return (
        <div>


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="BookingProductModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="BookingProductModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" value={user?.displayName} disabled className="input input-bordered w-full" />
                        <input name='patientName' type="text" defaultValue={user?.email} readOnly placeholder="Your Name" className="input input-bordered w-full" />
                        <input name='email' type="email" defaultValue={name} disabled placeholder="Email" className="input input-bordered w-full" />
                        <input name='email' type="email" defaultValue={price} disabled placeholder="Email" className="input input-bordered w-full" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" />
                        <input name='meetingLocation' type="text" placeholder="Meeting Location" className="input input-bordered w-full" />
                        <br />
                        <input className='w-full  btn btn-neutral' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OpenProductModal;