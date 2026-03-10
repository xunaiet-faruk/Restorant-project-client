import Marquee from "react-fast-marquee";
import Sharetitle from "../../Component/Sharedtitle/Sharetitle";
import img1 from '../../../public/ani1.png'
import img2 from '../../../public/ani2.png'
import img3 from '../../../public/ani3.png'
import img4 from '../../../public/ani4.png'
import img5 from '../../../public/ani5.png'
import img6 from '../../../public/ani7.png'
import img7 from '../../../public/ani8.png'
import img8 from '../../../public/ani9.png'
import backgroundImage from '../../../public/back1.png'
import { IoIosCall, IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoPeopleSharp, IoTime } from "react-icons/io5";


const Apoinment = () => {
    return (
        <div className="relative max-w-screen-2xl mx-auto">
            {/* Marquee Section (Background) */}
            <div className="absolute inset-0 bg-[#fef9f2] h-[400px] z-0">
                <div className="py-12" >
                    <Marquee speed={70} pauseOnHover={true}>
                        <img src={img5} alt="Image 5" className="mx-4 w-32" />
                        <img src={img2} alt="Image 2" className="mx-4 w-32" />
                        <img src={img3} alt="Image 3" className="mx-4 w-32" />
                        <img src={img4} alt="Image 4" className="mx-4 w-32" />
                        <img src={img1} alt="Image 1" className="mx-4 w-32" />
                        <img src={img6} alt="Image 6" className="mx-4 w-32" />
                        <img src={img7} alt="Image 7" className="mx-4 w-32" />
                        <img src={img8} alt="Image 8" className="mx-4 w-32" />
                    </Marquee>
                </div>
            </div>

            {/* Reservation Section (Foreground) */}
            <div className="relative z-10 flex flex-col justify-center top-44  items-center mb-64 max-w-screen-2xl mx-auto">
                <div
                    className="w-[70%] h-[700px] shadow-xl  border-[#F4B552] rounded-xl border-t-2 bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="relative z-10">
                        <h1 className="text-2xl font-semibold text-center text-[#F4B552] italic pt-3">Reservation</h1>
                        <div className="w-[200px] flex justify-center items-center mx-auto border-t-2 border-[#F4B552] my-3"></div>
                        <p className="text-center text-black font-bold text-5xl">Book Your Table Today</p>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-16 mt-12 space-y-12">
                        <div className="pt-12">
                            <input type="text" placeholder="Enter Name" className="px-12 border border-[#F4B552] rounded-full w-[300px] h-[40px]" />
                        </div>
                        <div>
                            <input type="email" placeholder="Enter Email" className="px-12 border border-[#F4B552] rounded-full w-[300px] h-[40px]" />
                        </div>
                        <div>
                            <input type="text" placeholder="+088188223928" className="px-12 border border-[#F4B552] rounded-full w-[300px] h-[40px]" />
                        </div>
                        <div>
                            <input type="number" placeholder="Enter Person" className="px-12 border border-[#F4B552] rounded-full w-[300px] h-[40px]" />
                        </div>
                        <div>
                            <input type="date" className="px-12 border border-[#F4B552] rounded-full w-[300px] h-[40px]" />
                        </div>
                        <div>
                            <input type="time" placeholder="Add A Time" className="px-12 border border-[#F4B552] rounded-full w-[300px] h-[40px]" />
                        </div>
                        <div>
                            <textarea placeholder="Write Your Message" className="px-12 py-6 border border-[#F4B552] rounded-full w-[950px] h-[120px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Apoinment;