import React from "react";
import { PiStarOfDavid } from "react-icons/pi";

const Logo = ({ size = "3.25rem", className }) => {
  return <PiStarOfDavid className={className} size={size} />;
};

export default Logo;
