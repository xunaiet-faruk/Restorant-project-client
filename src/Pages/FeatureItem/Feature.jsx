import video from '../../../public/124831-732633121_small.mp4'
import pic from '../../../public/01(2).png'
const Feature = () => {
    return (
      <div className='mb-12'>

            <div className=" max-w-screen-2xl mx-auto">

                <div className="space-y-3 flex flex-col justify-center items-center mb-12">

                    <h1 className="text-2xl font-semibold text-center text-yellow-600 ">*******Restaurants Food*******</h1>
                    <p className="text-md  uppercase border-y-4 py-4 md:w-[500px] text-center italic">Whether you’re feeling peckish or hungry, whether it’s midday or midnight,<br /> our menu has something to satisfy every appetite</p>


                </div>

                <div className=" relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden flex justify-center items-center">
                   
                    <video
                        src={video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    ></video>

                
                    <div className="relative z-10 text-white bg-black bg-opacity-20  p-2 rounded-lg w-[90%] md:w-[70%] lg:w-[50%]">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                            <img src={pic} alt="Restaurant Feature" className="w-72 object-cover rounded-full" />

                            <div className="space-y-3">
                                <h1 className="text-3xl font-semibold">Discover the Best of Our Restaurant!</h1>
                                <p className="text-sm">
                                    At our restaurant, every meal is an experience crafted with the finest ingredients and utmost care.
                                    From sizzling appetizers to indulgent desserts, our menu is designed to delight your taste buds.
                                    Enjoy chef-curated specialties, seasonal flavors, and signature dishes that keep our customers coming back for more! 🍽️✨
                                </p>

                                <button className="group relative z-10 h-10 w-40 rounded-md overflow-hidden border-b-2 rounded-b-xl border-yellow-400 text-xl text-white">
                                    <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                                    <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-yellow-600 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                                    <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-yellow-600 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                                    <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">Explore</span>
                                   View More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

      </div>
    );
};

export default Feature;