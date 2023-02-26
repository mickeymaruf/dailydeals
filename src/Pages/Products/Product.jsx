import moment from 'moment';
import { ImLocation } from 'react-icons/im';
import { BiFullscreen } from 'react-icons/bi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { AiFillStar, AiOutlineStop } from 'react-icons/ai';
import { useGetProductQuery } from '../../features/product/productApi';

const Product = () => {
    const { id } = useParams();
    const { data: product } = useGetProductQuery(id);
    const { _id, category, name, image, price, priceOriginal, contact, location: buyerLocation, used, createdAt, sellerName, sellerEmail } = product || {};

    const { user } = useAuth();
    const location = useLocation();
    // report to admin
    const reportToAdmin = () => {
        fetch(`${import.meta.env.VITE_APP_API_URL}/products/report/${_id}?email=${user.email}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')}`
            },
            body: JSON.stringify({ name, image })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast.success('Reported successfully');
                } else {
                    toast.error('Already reported');
                }
            })
    }
    return (
        <div className="max-w-screen-lg mx-auto bg-white md:my-8 lg:border rounded-sm lg:grid grid-cols-12">
            <div className='col-span-8 p-5 pt-3'>
                <h1 className='text-2xl font-bold'>{name}</h1>
                <p className='text-sm text-accent mt-1 mb-4'>
                    <span className='mr-1'>Posted on: {moment(createdAt).format("h:mm a")}</span>
                    <span>Location: <ImLocation className='inline w-4 h-4' />{buyerLocation}</span>
                </p>
                <PhotoProvider>
                    <PhotoView src={image}>
                        <div className='product_Image relative cursor-pointer'>
                            <img src={image} alt="" />
                            <BiFullscreen className='full_view_Icon absolute top-0 right-0 w-8 h-8 text-white m-2' />
                        </div>
                    </PhotoView>
                </PhotoProvider>
                <h1 className='text-2xl font-bold text-primary mt-3 mb-5'>Tk {price}</h1>
                <p className='text-sm'>Condition: Good</p>
                <p className='capitalize mb-5 text-sm'>Brand: {category}</p>
                <strong>Description</strong>
                <p className='text-sm text-accent'>
                    একদম নতুন কন্ডিশন।
                    বেশিদিন ব্যাবহার করা হয় নাই।
                    নতুন মডেল এর একটা কিনেছি তাই বিক্রি করে দিতে চাচ্ছি।
                    যারা নিতে আগ্রহী তারা নিশ্চিন্তে নিতে পারেন।
                </p>
                <div className='mt-8 border-t pt-3'>
                    {
                        user?.email === sellerEmail ?
                            <p className='text-xs'>You can't book your own product</p>
                            :
                            user?.email ?
                                <div className='flex items-center gap-5'>
                                    <label onClick={() => setModalData(product)} htmlFor="bookingModal" className="btn btn-primary">Book Now</label>
                                    <button onClick={reportToAdmin} className='btn p-0 min-h-fit h-fit bg-inherit border-0 hover:bg-inherit text-accent font-normal'>
                                        <AiOutlineStop className='h-6 w-6 mr-2' /> Report this ad
                                    </button>
                                </div>
                                :
                                <div className='flex items-center gap-5'>
                                    <Link to="/login" state={{ from: location }}><button className="btn btn-primary rounded-sm">Order Now</button></Link>
                                    <Link to="/login" state={{ from: location }}>
                                        <button onClick={reportToAdmin} className='btn p-0 min-h-fit h-fit bg-inherit border-0 hover:bg-inherit text-accent font-normal'>
                                            <AiOutlineStop className='h-6 w-6 mr-2' /> Report this ad
                                        </button>
                                    </Link>
                                </div>
                    }
                </div>
            </div>
            <div className='col-span-4 p-5 relative'>
                <div className='absolute top-0 right-0 m-3 mr-5 text-accent'>
                    <p><AiFillStar className='inline w-5 h-5' /> <span className='text-sm'>Save ad</span></p>
                </div>
                <div className='border mt-16 px-5 py-3 rounded-lg text-accent'>
                    <p>For sale by <strong className='text-black'>MD Yeasin</strong></p>
                </div>
            </div>


            {/* {
                modalData &&
                <BookingModal product={modalData} setModalData={setModalData} />
            } */}
        </div>
    );
};

export default Product;