"use client"

import Link from "next/link"
import { useState } from "react";

const Navbar = () => {

  const [visible, setVisible] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

  const angles = [30, 90, 150];

  const handleMenue = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  return (
	<nav className=" relative flex w-full items-center justify-center ">

    <button className=" absolute border size-25 -translate-y-25 rounded-full"
    onClick={() => handleMenue()}
    />
    <div className={`relative flex w-full items-center justify-center transition duration-500 ease-linear ${visible ? '-translate-y-25' : '-translate-y-100'} mx-auto pointer-events-none`}>

      <div className=" absolute flex size-120 border-4 border-[#575757c8] shadow-2xl shadow-[#767676] rounded-full"/>
      <div className=" absolute flex size-70 border-4 border-[#575757c8] shadow-2xl shadow-[#909090e4] rounded-full"/>
      <div className=" absolute flex size-50 border-4 border-[#575757c8] shadow-2xl shadow-[#9c9c9c] rounded-full"/>
      <div className=" absolute flex size-35 border-4 border-[#575757c8] shadow-2xl shadow-[#a4a4a4] rounded-full"/>
      <div className=" absolute flex size-25 border-4 border-[#575757c8] shadow-2xl shadow-[#ffffff] rounded-full"/>

      <div className="relative size-60">
        
        {links.map((link, index) => {
          const angle = angles[index];
          // turn angles to radian
          const rad = (angle * Math.PI) / 180;

          const radius = 150; 
          const x = radius + radius * Math.cos(rad);
          const y = radius + radius * Math.sin(rad);

          return (
            <Link
              key={link.href}
              href={link.href}
              className="absolute flex w-20 items-center justify-center -translate-x-18 shadow-2xs shadow-[#8a8a8acd] bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-zinc-700 transition duration-100"
              style={{ left: x, top: y }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
    
  </nav>
  )
}

export default Navbar