import React from "react";
import Logo from "../app/assets/images/pokemon_logo.png";
import Image from "next/image";

export default function Navbar() {
  if (typeof window === "undefined") {
    return null;
  }
  const position = document.getElementById("pokemon-explorer");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`sticky top-0 z-50  items-center justify-center bg-white p-2 ${
        position ? "shadow-md flex" : "hidden"
      }`}
    >
      <div className="cursor-pointer" onClick={scrollToTop}>
        <Image src={Logo} width={100} height={100} alt="logo" />
      </div>
    </div>
  );
}
