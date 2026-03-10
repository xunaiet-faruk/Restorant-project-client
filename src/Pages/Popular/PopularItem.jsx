
import Usemenu from "../../Hooks/Usemenu";

const PopularItem = () => {
    const [popular] =Usemenu()
    const populrFood = popular.filter(item => item.category === "popular")
    const soupFood = popular.filter(item => item.category === "soup")
 
    return (
        <div>
            <div className="mt-16">

                <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-12 mb-12">
                    {populrFood?.map((item) => (
                        <div key={item._id}>
                            <div className="flex gap-5">
                                <div>
                                    <img
                                        style={{ borderRadius: "400px 0px 400px 400px" }}
                                        className="w-[140px]"
                                        src={item?.image}
                                        alt=""
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-2xl uppercase">{item?.name}</h1>
                                    <p>{item?.recipe}</p>
                                </div>
                                <div>
                                    <p className="text-xl text-[#F4B552]">${item?.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center mb-12">
                    <button className="  group relative z-10 h-11 w-60 rounded-xl shadow-xl  overflow-hidden border-b-2 rounded-b-xl border-[#F4B552]  text-xl ">
                        <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                        <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-yellow-600 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                        <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-yellow-600 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                        <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">Explore</span>
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopularItem;
