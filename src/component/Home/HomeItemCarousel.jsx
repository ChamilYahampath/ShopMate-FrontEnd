import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import { TopItems } from "./TopItems";
import CarouselItems from "./CarouselItems";

const MultiItemCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
      };
    return (
        <div>
        <section className="p-10 lg:py-10 lg:px-20">
          <h1 className="text-3xl font-semibold text-white text-center py-3 pb-10">Top Items</h1>
        </section>
            <Slider {...settings}>
                {TopItems.map((item) => (
                    <CarouselItems image={item.image} title={item.title} /> 
                ))}    
            </Slider>
        </div>
    )
}

export default MultiItemCarousel;