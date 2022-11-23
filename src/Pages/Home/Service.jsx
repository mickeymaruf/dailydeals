import handoverImg from '../../assets/images/handover.png';
import deliveryImg from '../../assets/images/delivery.png';
import { BiPlusCircle } from 'react-icons/bi'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import Heading from '../../components/Heading';

const Service = () => {
    return (
        <> 
            <Heading>Services</Heading>
            <div className='flex flex-col lg:flex-row shadow-lg border'>
                <div className="flex-1 flex p-5 items-center border-b border-r">
                    <figure className='px-3'>
                        <img className='w-56' src={handoverImg} alt="Movie" />
                    </figure>
                    <div>
                        <h2 className="card-title">Benifit of Exchanging P2P</h2>
                        <p className='text-sm my-1'>
                            Do you have something to sell?
                            Post your first ad and start making money!</p>
                        <div className="card-actions mt-3">
                            <button className="btn btn-info rounded-full px-10 text-white">
                                <BiPlusCircle className='w-5 h-5 mr-2' /> Add Item
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex p-5 items-center">
                    <figure className='px-3'>
                        <img className='w-32' src={deliveryImg} alt="Movie" />
                    </figure>
                    <div>
                        <h2 className="card-title">Deliver to Your Doorstep</h2>
                        <p className='text-sm'>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions mt-3">
                            <button className="btn btn-warning rounded-full px-10">
                                View Products <IoIosArrowDroprightCircle className='w-5 h-5 ml-2' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Service;