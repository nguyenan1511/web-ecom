import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Slider = ({ children, slidesPerView = 1, spaceBetween = 50 }) => {
    return (
        <Swiper
            // install Swiper modules
            modules={ [ Pagination ] }
            spaceBetween={ spaceBetween }
            slidesPerView={ slidesPerView }
            // navigation
            pagination={ { clickable: true } }
        // scrollbar={ { draggable: true } }
        // onSwiper={ (swiper) => console.log(swiper) }
        // onSlideChange={ () => console.log('slide change') }
        >
            {
                React.Children.map(children, (child) => <SwiperSlide>{ child }</SwiperSlide>)
            }

        </Swiper>
    )
}

export default Slider


