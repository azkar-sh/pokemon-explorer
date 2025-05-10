import React from "react";
import Logo from "../app/assets/images/pokemon_logo.png";
import Image from "next/image";

export default function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-0 z-50 w-full p-4 bg-blue-100 flex items-center justify-between">
      <div className="cursor-pointer" onClick={scrollToTop}>
        <Image src={Logo} width={100} height={100} alt="logo" />
      </div>
    </div>
  );
}
