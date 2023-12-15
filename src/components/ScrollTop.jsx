import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const ScrollTop = () => {
  const ButtonRef = useRef();
  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY > 500) {
        ButtonRef.current.style.display = "flex";
      } else {
        ButtonRef.current.style.display = "none";
      }
    };
    const scrollTopFunction = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    ButtonRef.current.addEventListener("click", scrollTopFunction);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ButtonRef.current.removeEventListener("click", scrollTopFunction);
    };
  }, []);

  return (
    <IconButton id="scrollTop" ref={ButtonRef}>
      <KeyboardDoubleArrowUpIcon fontSize="inherit" />
    </IconButton>
  );
};

export default ScrollTop;
