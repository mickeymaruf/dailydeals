import React from 'react';
import Heading from '../../../components/Heading';

const AddProduct = () => {
    return (
        <div>
            <Heading>Add A Product</Heading>
            <div className="card rounded-none flex-shrink-0 w-full max-w-md bg-white border mx-auto my-10">
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" placeholder="price" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Condition</span>
                        </label>
                        <select className="select select-bordered font-normal">
                            <option>Excellent</option>
                            <option selected>Good</option>
                            <option>Fair</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mobile Number</span>
                        </label>
                        <input type="text" placeholder="phone" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text" placeholder="location" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="description"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">How long have you been using ?</span>
                        </label>
                        <input type="text" placeholder="year" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered" />
                    </div>
                    <div className='flex gap-3'>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input type="radio" name="radio-10" className="radio checked:bg-accent" checked />
                                <span className="label-text ml-2">Buyer</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input type="radio" name="radio-10" className="radio checked:bg-info" />
                                <span className="label-text ml-2">Seller</span>
                            </label>
                        </div>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AddProduct;