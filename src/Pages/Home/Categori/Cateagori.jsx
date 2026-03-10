import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import './Categori.css';
import Sharetitle from '../../../Component/Sharedtitle/Sharetitle';

const Cateagori = () => {
    const images = [
        "/slide1.jpg",
        "/slide2.jpg",
        "/slide3.jpg",
        "/slide4.jpg",
        "/slide1.jpg",
        "/slide3.jpg",
        "/slide4.jpg",
    ];

    return (
        <div className='my-20 max-w-screen-2xl mx-auto '>
            <Sharetitle heading={"Order Online"} subHeading={"From  11.00am to 10.00pm"} />

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                autoplay={{
                    delay: 2000, 
                    disableOnInteraction: false
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className="slide">
                        <img src={img} alt={`Slide ${index + 1}`} className="slide-image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Cateagori;
