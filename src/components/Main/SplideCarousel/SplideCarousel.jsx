import React, { useRef, useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import "@splidejs/splide/css/sea-green";
import { Container } from "@mui/system";
import { useDirectionThemeContext } from "../../../Context/Direction";
import classes from "./Splide.module.css";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SplideCarousel = ({ images, text }) => {
  const splideRef = useRef(null);
  const { isRtl } = useDirectionThemeContext();

  useEffect(() => {
    const splide = new Splide(splideRef.current, {
      arrows: true,
      arrowPath: "",
      prevArrow: '<button class="splide__arrow--prev">Previous</button>',
      nextArrow: '<button class="splide__arrow--next">Next</button>',
      type: "loop",
      perPage: 5,
      perMove: 1,
      direction: `${isRtl ? "rtl" : "ltr"}`,
      gap: "1rem",
      breakpoints: {
        1024: {
          perPage: 3,
          gap: ".7rem",
        },
        768: {
          perPage: 2,
          gap: ".7rem",
        },
        640: {
          perPage: 1,
          gap: ".7rem",
        },
      },
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, [isRtl]);
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <section
        ref={splideRef}
        className={`splide ${classes.splide}`}
        aria-label="Splide Basic HTML Example"
      >
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((image, i) => (
              <li key={i} className={`splide__slide ${classes.splide__slide}`}>
                <img src={image} />
                <h3>أحمد الشقيري</h3>
                <p>مدير الموقع</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={`splide__arrows ${classes.splide__arrows}`}>
          <div className={`${classes.row_reverse}`}>
            <div
              className={`splide__arrow--prev  ${classes.splide__arrow__prev}`}
            >
              <IconButton>
                <ArrowLeftOutlined />
              </IconButton>
            </div>
            <div
              className={`splide__arrow--next  ${classes.splide__arrow__next}`}
            >
              <IconButton>
                <ArrowLeftOutlined />
              </IconButton>
            </div>
          </div>
          <Button variant="contained" onClick={() => navigate("/specialists")}>
            {text}
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default SplideCarousel;
