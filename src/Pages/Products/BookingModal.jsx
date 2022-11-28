import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import FieldError from '../../components/FieldError';
import { useAuth } from '../../contexts/AuthProvider';

const BookingModal = ({ product, setModalData }) => {
    const { user } = useAuth();
    const { _id, name, price, image } = product;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const bookingProduct = {
            productName: name,
            productId: _id,
            price,
            image,
            buyer: user.displayName,
            buyerEmail: user.email,
            buyerContact: data.contact,
            meetingLocation: data.location,
            message: data.message
        }
        fetch(`https://dailydeals-server.vercel.app/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingProduct)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    toast.success(`${name} is booked successfully`)
                    setModalData(null);
                }
            })
    }
    return (
        <>
            <input type="checkbox" id="bookingModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={() => setModalData(null)} htmlFor="bookingModal" className="btn btn-sm btn-warning btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-2 text-accent">Book Now</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={user.displayName} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={user.email} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={name} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" className="input input-bordered w-full" defaultValue={price} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your contact number</span>
                            </label>
                            <input {...register("contact", { required: "Contact is required" })} type="text" placeholder="phone" className="input input-bordered" />
                            {
                                errors.contact && <FieldError>{errors.contact?.message}</FieldError>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meeting location</span>
                            </label>
                            <input {...register("location", { required: "Location is required" })} type="text" placeholder="location" className="input input-bordered" />
                            {
                                errors.location && <FieldError>{errors.location?.message}</FieldError>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Message</span>
                            </label>
                            <textarea {...register("message")} className="textarea textarea-bordered" placeholder="message (optional)"></textarea>
                        </div>
                        <div className="form-control mt-4">
                            <button className="btn btn-primary">Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;