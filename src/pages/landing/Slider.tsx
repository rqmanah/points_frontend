// components/Slider.js
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
const Slider = () => {
  return (
    <section className="home-slider owl-carousel">
      <Swiper className="mySwiper" loop autoplay>
        <SwiperSlide
          style={{
            backgroundImage: "url('/bg_1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            height: "600px",
            zIndex: 0,
          }}
        >
          <div
            style={{
              background:
                "-webkit-linear-gradient(45deg, #0d1128 0%, #fd6100 100%)",
              opacity: ".5",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          ></div>
          <div className="container">
            <div
              className="row no-gutters slider-text align-items-center justify-content-start"
              style={{
                height: "600px",
                position: "absolute",
                zIndex: "2",
              }}
            >
              <div className="col-md-8">
                <h1
                  className="mb-4"
                  style={{
                    fontSize: "50px",
                    color: " #fff",
                    lineHeight: "1.2",
                    fontWeight: "600",
                  }}
                >
                  Education Needs Complete Solution
                </h1>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia.
                </p>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia.
                </p>
                <p className="mb-0 w-25">
                  <a
                    href="#"
                    className="btn py-2 px-3 primary-bgColor text-white d-flex align-items-center justify-content-center rounded-5 fs-6"
                  >
                    <span>Register</span>
                  </a>
                </p>
              </div>
            </div>

            <div></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlide
            style={{
              backgroundImage: "url('/bg_1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              backgroundRepeat: "no-repeat",
              height: "600px",
              zIndex: 0,
            }}
          >
            <div
              style={{
                background:
                  "-webkit-linear-gradient(45deg, #0d1128 0%, #fd6100 100%)",
                opacity: ".5",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            ></div>
            <div className="container">
              <div
                className="row no-gutters slider-text align-items-center justify-content-start"
                style={{
                  height: "600px",
                  position: "absolute",
                  zIndex: "2",
                }}
              >
                <div className="col-md-8">
                  <h1
                    className="mb-4"
                    style={{
                      fontSize: "50px",
                      color: " #fff",
                      lineHeight: "1.2",
                      fontWeight: "600",
                    }}
                  >
                    Education Needs Complete Solution
                  </h1>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                  <p className="mb-0 w-25">
                    <a
                      href="#"
                      className="btn py-2 px-3 primary-bgColor text-white d-flex align-items-center justify-content-center rounded-5 fs-6"
                    >
                      <span>Register</span>
                    </a>
                  </p>
                </div>
              </div>

              <div></div>
            </div>
          </SwiperSlide>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Slider;
