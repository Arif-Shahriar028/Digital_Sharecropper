import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const imgs = [
  {
    id: 1,
    url: "/img/img1.jpg",
  },
  {
    id: 2,
    url: "/img/img2.jpg",
  },
  {
    id: 3,
    url: "/img/img3.jpg",
  },
  {
    id: 4,
    url: "/img/img4.jpg",
  },
];
const Hero = () => {
  return (
    <React.Fragment>
      <div className="w-full h-screen justify-center items-center">
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={true}
          infiniteLoop={true}
          showThumbs={false}
          autoPlay
          stopOnHover
        >
          {imgs.map((ig) => (
            <div
              key={ig.id}
              className="w-full flex justify-center items-center"
            >
              <img
                src={ig.url}
                alt=""
                style={{
                  width: "100%",
                  height: "100vh",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </React.Fragment>
  );
};

export default Hero;
