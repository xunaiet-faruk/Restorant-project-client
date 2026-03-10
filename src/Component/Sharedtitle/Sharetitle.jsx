

// eslint-disable-next-line react/prop-types
const Sharetitle = ({heading,subHeading,heading2}) => {
    return (
        <div className="flex flex-col justify-center items-center pb-12">
          
            <h2 className="text-yellow-600 p-2 text-xl">*******{subHeading}*******</h2>
            <p className="md:text-4xl uppercase border-y-4 py-4 md:w-[500px] text-center italic font-semibold text-black">{heading}<span className="text-[#F4B552]">{heading2}</span></p>
        </div>
    );
};

export default Sharetitle;