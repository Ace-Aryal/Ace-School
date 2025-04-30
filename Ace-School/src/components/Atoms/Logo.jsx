import React from "react";
import { PiStarOfDavid } from "react-icons/pi";

const Logo = ({ color = "white", size = "3.25rem" }) => {
  return <PiStarOfDavid color={color} size={size} />;
};

export default Logo;
