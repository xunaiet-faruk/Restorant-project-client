const Sharebanner = ({ img, title, description }) => {
    return (
        <div className="relative max-w-screen-2xl mx-auto">

            <img className="h-full w-full" src={img} alt="" />

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute inset-0 flex justify-center items-center flex-col space-y-4">
                <h1 className="text-8xl text-white font-semibold font-serif">{title}</h1>
                <p className="text-xl font-serif text-gray-300 font-medium w-[800px] text-center"> {description}</p>
            </div>
        </div>
    );
};

export default Sharebanner;
