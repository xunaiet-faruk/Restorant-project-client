import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import  './Food.css'
import Sharebanner from "../../Component/Sharebanner/Sharebanner";
import image from '../../../public/foodb.png'
import Usemenu from "../../Hooks/Usemenu";
import FoodCard from "./FoodCard";
const Food = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [popular] = Usemenu()
    const soupFood = popular.filter(item => item.category === "soup")
    const saladFood = popular.filter(item => item.category === "salad")
    const pizzaFood = popular.filter(item => item.category === "pizza")
    const drinksFood = popular.filter(item => item.category === "drinks")

    return (
        <div>
              <Sharebanner img={image}/>

            <div className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    {/* Tab List */}
                    <TabList className="flex gap-4 border-none justify-center items-center mb-5">
                        <Tab className={`px-4 py-2 cursor-pointer focus:outline-none ${tabIndex === 0 ? "!text-yellow-500 !font-bold" : ""}`}>Title 1</Tab>
                        <Tab className={`px-4 py-2 cursor-pointer focus:outline-none ${tabIndex === 1 ? "!text-yellow-500 !font-bold" : ""}`}>Title 2</Tab>
                        <Tab className={`px-4 py-2 cursor-pointer focus:outline-none ${tabIndex === 2 ? "!text-yellow-500 !font-bold" : ""}`}>Title 3</Tab>
                        <Tab className={`px-4 py-2 cursor-pointer focus:outline-none ${tabIndex === 3 ? "!text-yellow-500 !font-bold" : ""}`}>Title 4</Tab>
                        </TabList>

                    {/* Tab Panels */}
                    <TabPanel>
                       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 ">
                            {
                                soupFood?.map((item) => <FoodCard key={item._id} item={item} />)
                            }
                       </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
                            {
                                 saladFood?.map((item) => <FoodCard key={item._id} item={item} />)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
                            {
                                pizzaFood?.map((item) => <FoodCard key={item._id} item={item} />)
                            }
                        </div>               
                             </TabPanel>
                    <TabPanel>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
                            {
                                 drinksFood ?.map((item) => <FoodCard key={item._id} item={item} />)
                            }
                        </div>                    </TabPanel>
                </Tabs>
            </div>
            
        </div>
        
    );
};

export default Food;
