import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import uploadImage from '../../../apis/uploadImage';
import FieldError from '../../../components/FieldError';
import Heading from '../../../components/Heading';
import { useAuth } from '../../../contexts/AuthProvider';
import { CategoryContext } from '../../../contexts/CategoryProvider';
import toast from 'react-hot-toast';
import SpinnerSm from '../../../components/SpinnerSm';
import { useAddProductMutation } from '../../../features/product/productApi';
import { useEffect } from 'react';

const AddProduct = () => {
    const [spinner, setSpinner] = useState(false);
    const { user } = useAuth();
    const { categories } = useContext(CategoryContext);
    const navigate = useNavigate();

    const [addProduct, { data: productData }] = useAddProductMutation();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setSpinner(true);
        const { category, name, image, price, priceOriginal, contact, location, used } = data;
        const product = {
            category, name, price, priceOriginal, used,
            location, contact,
            sellerName: user.displayName,
            sellerEmail: user.email
        }

        // upload image
        const formData = new FormData();
        formData.append('image', image[0]);
        uploadImage(formData)
            .then(imageData => {
                if (imageData.status === 200) {
                    product.image = imageData.data.url;
                    // create product
                    addProduct(product)
                }
            })
            .catch(err => {
                setSpinner(true);
                console.log(err)
            })
    }

    useEffect(() => {
        // actions on product get added
        if (productData?.insertedId) {
            setSpinner(true);
            navigate("/dashboard/myproducts");
            toast.success("Product added successfully");
        }
    }, [productData])

    return (
        <div>
            <Heading>Add A Product</Heading>
            <div className="card rounded-none flex-shrink-0 w-full max-w-md bg-white border mx-auto my-10">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <select {...register("category", { required: "Select a category" })} className="select select-bordered select-sm w-fit font-normal">
                            <option disabled selected value=''>Select category</option>
                            {
                                categories?.map(category => <option key={category._id} value={category.slug}>{category.name}</option>)
                            }
                        </select>
                        {
                            errors.category && <FieldError>{errors.category?.message}</FieldError>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input {...register("name", { required: "Name is required" })} type="text" placeholder="name" className="input input-bordered" />
                        {
                            errors.name && <FieldError>{errors.name?.message}</FieldError>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input {...register("image", { required: "Image is required" })} type="file" className="file-input file-input-bordered" />
                        {
                            errors.image && <FieldError>{errors.image?.message}</FieldError>
                        }
                    </div>
                    <div className="flex gap-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input {...register("price", { required: "Price is required" })} type="number" placeholder="price" className="input input-bordered w-full" />
                            {
                                errors.price && <FieldError>{errors.price?.message}</FieldError>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input {...register("priceOriginal", { required: "Price original is required" })} type="number" placeholder="original price" className="input input-bordered w-full" />
                            {
                                errors.priceOriginal && <FieldError>{errors.priceOriginal?.message}</FieldError>
                            }
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Condition</span>
                        </label>
                        <select {...register("condition", { required: "Select product condition" })} className="select select-bordered font-normal">
                            <option value="" selected disabled>Select condition</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                        {
                            errors.condition && <FieldError>{errors.condition?.message}</FieldError>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mobile Number</span>
                        </label>
                        <input {...register("contact", { required: "Contact is required" })} type="text" placeholder="phone" className="input input-bordered" />
                        {
                            errors.contact && <FieldError>{errors.contact?.message}</FieldError>
                        }
                    </div>
                    <div className="flex gap-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input {...register("location", { required: "Location is required" })} type="text" placeholder="location" className="input input-bordered w-full" />
                            {
                                errors.location && <FieldError>{errors.location?.message}</FieldError>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Used year</span>
                            </label>
                            <input {...register("used", { required: "Used info is required" })} type="text" placeholder="year" className="input input-bordered w-full" />
                            {
                                errors.used && <FieldError>{errors.used?.message}</FieldError>
                            }
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register("description")} className="textarea textarea-bordered" placeholder="description (optional)"></textarea>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn btn-primary">
                            {spinner ? <>Loading <SpinnerSm /></> : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default AddProduct;