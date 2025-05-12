import Image from "next/image";
import React from "react";
import Logo from "../app/assets/images/pokemon_logo.png";
import { MoveDownIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const handleScroll = () => {
    const element = document.getElementById("pokemon-explorer");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-tl from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center">
      <Image src={Logo} width={500} height={500} alt="logo" />

      <div
        className="absolute bottom-10 cursor-pointer rounded-full p-4 shadow-lg backdrop-blur-lg hover:bg-white/10 bg-white/15"
        onClick={handleScroll}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
        >
          <MoveDownIcon />
        </motion.div>
      </div>
    </div>
  );
}
