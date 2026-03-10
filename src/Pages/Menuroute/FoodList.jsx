import Sharebanner from "../../Component/Sharebanner/Sharebanner";
import PopularItem from "../Popular/PopularItem";
import img1 from '../../../public/banner2.jpg'
import img2 from '../../../public/res1.webp'
import res4 from '../../../public/re4.jpg'
import Sharetitle from "../../Component/Sharedtitle/Sharetitle";

const FoodList = () => {
    return (
        <div className="space-y-14">
            <Sharebanner img={img1} title={"OUR MENU"} description={"Would you like to try a dish"}/>
            <Sharetitle  heading={"Popular"} subHeading={"---Don't miss Popular Item---"} />
            <PopularItem/>
            <Sharebanner img={img2} title={"DESSERTS"} description={"Delicious treats that melt in your mouth,bringing joy in every bite,Indulge in our heavenly selection of sweet delights,crafted to satisfy your every craving"}/>
            <Sharetitle heading={"DESSERTS"} subHeading={"---Don't miss---"} />
           <PopularItem/>
            <Sharebanner img={res4} title={"Soup"} description={"Delicious treats that melt in your mouth,bringing joy in every bite,Indulge in our heavenly selection of sweet delights,crafted to satisfy your every craving"}/>
            <Sharetitle heading={"Soup"} subHeading={"---Don't miss---"} />
            <PopularItem/>
        </div>
    );
};

export default FoodList;