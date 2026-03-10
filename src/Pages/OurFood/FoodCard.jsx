import { CiShoppingBasket } from "react-icons/ci";


const FoodCard = ({item}) => {
    const {name,image,price,recipe} =item;
    const handleClick = food =>{
        console.log(food);
    }
    

    return (
        <div >
            <div  className="relative group cursor-pointer ">

                <div className="absolute top-4 left-4 w-[350px] h-[360px] bg-[#F4B552] rounded-xl shadow-lg transform rotate-3 skew-y-2 transition-opacity duration-500 opacity-100 group-hover:opacity-0"></div>


                <div className="bg-white w-[350px] h-[360px] rounded-xl shadow-xl relative z-10">
                    <div className="flex justify-between px-4">
                        <img src={image} alt={name} className="w-[130px] h-[130px] rounded-full" />
                        <p className="text-3xl py-5 font-bold mt-2 text-[#F4B552]">${price}</p>
                    </div>
                    <h1 className="text-2xl pl-6 font-bold mt-3 py-1">{name}</h1>
                    <p className="text-gray-400 text-[20px] pl-6 py-1 font-semibold px-4 pb-6">{recipe}</p>
                    <div className="flex justify-end items-end px-5">
                        <button onClick={() =>handleClick(item)}>
                            <CiShoppingBasket className="text-[30px] hover:text-[#F4B552] hover:scale-150 transition-transform duration-300"/>

                        </button>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default FoodCard;