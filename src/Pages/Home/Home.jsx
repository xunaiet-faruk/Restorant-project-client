import Apoinment from "../Appoinment/Apoinment";
import Feature from "../FeatureItem/Feature";
import Menu from "../Menu/Menu";
import Ban from "./Banner/Ban";
import Cateagori from "./Categori/Cateagori";


const Home = () => {
    return (
        <div>
       
            <Ban/>
            <Cateagori/>
            <Feature/>
            <Menu/>
            <Apoinment/>     
            
        </div>
    );
};

export default Home;