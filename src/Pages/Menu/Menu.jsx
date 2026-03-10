import { useEffect, useState } from "react";
import Sharetitle from "../../Component/Sharedtitle/Sharetitle";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [userRating, setUserRating] = useState(1);

    useEffect(() => {
        fetch('Menu.json')
            .then(res => res.json())
            .then(data => setMenu(data));
    }, []);

    return (
        <div>
            <Sharetitle heading={"Let's check our menu"} subHeading={"Check it out"} />

            <div className="py-12 flex flex-col justify-center items-center mb-20">
         
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-14 ">
                    {
                        menu.map((item) => (
                            // <div key={item.id} className="relative group cursor-pointer">
                        
                            //     <div className="absolute top-4 left-4 w-[350px] h-[360px] bg-[#F4B552] rounded-xl shadow-lg transform rotate-3 skew-y-2 transition-opacity duration-500 opacity-100 group-hover:opacity-0"></div>

                              
                            //     <div className="bg-white w-[350px] h-[360px] rounded-xl shadow-xl relative z-10">
                            //         <div className="flex justify-between px-4">
                            //             <img src={item.image} alt={item.name} className="w-[130px] h-[130px] rounded-full" />
                            //             <p className="text-3xl py-5 font-bold mt-2 text-[#F4B552]">${item.price}</p>
                            //         </div>
                            //         <h1 className="text-2xl pl-6 font-bold mt-3 py-1">{item.name}</h1>
                            //         <p className="text-gray-400 text-[20px] pl-6 py-1 font-semibold px-4 pb-6">{item.details}</p>
                            //     </div>
                            // </div>

                                <div key={item.id}>

                                <div className="w-full max-w-[380px] space-y-3 rounded-xl bg-white bg-white/10 backdrop-blur-md overflow-hidden border border-white/20 hover:scale-105 transition-transform duration-300 p-4 shadow-lg ">
                                    <div className="relative flex h-52 w-full justify-center lg:h-[270px]">
                                        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                                           
                                            <button className="rounded-xl backdrop-blur-xl bg-white/10  px-3 py-1 font-medium text-white duration-200 hover:bg-[#0095FF]/90">$ {item?.price}</button>
                                        </div>
                                        <img width={400} height={400} className="rounded-lg bg-black/40 object-cover" src={item?.image}/>                               
                                             </div>
                                    <div className="space-y-3 font-semibold">
                                        <div className="flex justify-between">
                                            <h6 className="text-sm md:text-base lg:text-[20px] font-semibold">{item?.name}</h6>
                                            <div className="flex items-center gap-1">
                                                <Rating
                                                    readonly
                                                    initialRating={item?.rating}
                                                    emptySymbol={<FaRegStar className="text-gray-400" />}
                                                    fullSymbol={<FaStar className="text-yellow-500" />}
                                                />
                                            </div>

                                        </div>
                                        <p className="text-xs font-semibold text-gray-400 md:text-sm">{item?.details}</p>
                                       
                                    </div>
                                    <div className="flex flex-wrap items-center justify-end   md:text-base ">
                                        <button className=" bg-gray-400 px-4 py-1
                                        font-semibold text-white duration-300 hover:scale-95 hover:bg-yellow-600">View More
                                        </button>
                                    </div>
                                </div>

                                    </div>


                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Menu;
