import React, { useState, useEffect } from 'react';
import './Banner.css';

const foodItems = [
    {
        id: 1,
        img: '/pizza.png',
        bg: '#FFA370',
        title: 'Sizzling Hot Pepperoni Pizza',
        desc: 'Experience the perfect blend of crispy crust, tangy tomato sauce, and a generous layer of melted mozzarella cheese topped with spicy pepperoni. A classic favorite that never disappoints!',
        buttonColor: '#FF6F3C'
    },
    {
        id: 2,
        img: '/burger.png',
        bg: '#C3FF86',
        title: 'Juicy Double Beef Cheeseburger',
        desc: 'Sink your teeth into a tower of flavor with two grilled beef patties, melted cheddar, crunchy lettuce, fresh tomato, and our signature burger sauce—all sandwiched between a toasted sesame bun.',
        buttonColor: '#8BC34A'
    },
    {
        id: 3,
        img: '/salad.png',
        bg: '#FFDCDC',
        title: 'Refreshing Garden Fresh Salad',
        desc: 'A colorful medley of crisp romaine lettuce, cherry tomatoes, cucumbers, olives, bell peppers, and crunchy croutons tossed in a zesty vinaigrette dressing. Perfect for a light and healthy meal.',
        buttonColor: '#E91E63'
    },
    {
        id: 4,
        img: '/birani.png',
        bg: '#D8E5FF',
        title: 'Royal Chicken Biryani Delight',
        desc: 'Aromatic basmati rice cooked with succulent pieces of marinated chicken, layered with rich spices, saffron, and fried onions. Served hot, this biryani offers a royal taste in every bite.',
        buttonColor: '#2196F3'
    },
    {
        id: 5,
        img: '/cake.png',
        bg: '#FFDDC1',
        title: 'Classic Chocolate Fudge Cake',
        desc: 'Indulge in a moist and rich chocolate cake layered with thick fudge frosting and topped with delicate chocolate shavings. A decadent dessert that melts in your mouth with every bite.',
        buttonColor: '#FF9800'
    },
    {
        id: 6,
        img: '/deliciouis.png',
        bg: '#FFF3C4',
        title: 'Golden Crispy Fried Chicken',
        desc: 'Perfectly seasoned and deep-fried to golden perfection, our fried chicken offers a crispy outside and tender, juicy inside. Served hot and crispy with your favorite dipping sauce.',
        buttonColor: '#FFC107'
    },
    {
        id: 7,
        img: '/soup.png',
        bg: '#C4F3FF',
        title: 'Comforting Creamy Chicken Soup',
        desc: 'Warm your soul with a hearty bowl of creamy chicken soup made with tender shredded chicken, fresh vegetables, and a creamy, flavorful broth. Ideal for a cozy and comforting meal.',
        buttonColor: '#03A9F4'
    }
];

const Ban = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animateMain, setAnimateMain] = useState(false);

    useEffect(() => {
        setAnimateMain(true);
        const timeout = setTimeout(() => setAnimateMain(false), 500);
        return () => clearTimeout(timeout);
    }, [activeIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % foodItems.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const radius = 350;
    const angleStep = 180 / (foodItems.length - 1);
    const activeItem = foodItems[activeIndex];

    return (
        <div className="relative min-h-screen flex items-center justify-between px-10 container mx-auto overflow-hidden">

            {/* Wave background */}
           

            {/* Right Side Background Extension */}
            <div
                className="absolute right-0 top-0 w-[1200px] h-[600px] z-0"
                style={{
                    backgroundColor: activeItem.bg,
                    clipPath: 'path("M0 0 H1200 V500 Q1000 150 800 400 T400 500 T0 500 Z")'
                }}
            ></div>



            {/* Left Section */}
            <div className="w-1/2 space-y-12 z-10 pt-12">
                <h1
                    className="text-6xl font-bold transition-colors duration-500"
                    style={{ color: activeItem.buttonColor }}
                >
                    {activeItem.title}
                </h1>

                <p className="text-gray-500 max-w-md">{activeItem.desc}</p>
                <button
                    className="px-6 py-2 rounded text-white font-semibold transition-all duration-300"
                    style={{ backgroundColor: activeItem.buttonColor }}
                >
                    Explore Now
                </button>
            </div>


            {/* Right Image Arc */}
            <div className="w-1/2 flex flex-col items-center justify-center relative z-10">
                <div className="arc-container relative w-[600px] h-[250px] mb-0">
                    {foodItems.map((item, index) => {
                        const angle = angleStep * index;
                        const rad = (angle * Math.PI) / 180;
                        const x = radius * Math.cos(rad);
                        const y = radius * Math.sin(rad);

                        return (
                            <div key={item.id}>
                                <img
                                    src={item.img}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-24 h-24 rounded-full object-cover cursor-pointer absolute transition-all duration-300 border-4 shadow-lg ${index === activeIndex ? 'scale-110 border-black z-10' : 'opacity-80 border-white'}`}
                                    style={{
                                        left: `${300 + x}px`,
                                        top: `${250 - y}px`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    alt="thumb"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Main Image */}
                <div
                    className={`absolute top-[90%] left-[300px] transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] transition-all duration-500 ${animateMain ? 'slide-in-left' : ''} bg-transparent`}
                >
                    <img
                        src={activeItem.img}
                        alt="Main Food"
                        className="w-full h-full object-cover bg-transparent"
                    />
                </div>
            </div>
        </div>
    );
};

export default Ban;
