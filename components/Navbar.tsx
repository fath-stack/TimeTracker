"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Navbar = () => {

  const circleRefs = useRef([]);
  const tlRef = useRef(null);
  
  useEffect(() => {
  
    const tl = gsap.timeline({ paused: false, yoyo: true, repeat: 1 });
    tlRef.current = tl;

    circles.forEach((c, i) => {
      tl.fromTo(
        circleRefs.current[i],
        { width: 25, height: 25, opacity: 0},
        {
          width: c.size,
          height: c.size,
          opacity: 100,
          duration: i * factor,
          ease: "power3.out",
        },
      );
    });

    // return to first size by click  
    const reset = () => {
      tl.reverse(); // reverse waves
    };

    window.addEventListener("click", reset);
    return () => window.removeEventListener("click", reset);
  }, []);
  
  const circles = [
    { size: 115 },
    { size: 70 },
    { size: 50 },
    { size: 35 },
    { size: 25 },
  ];

  const factor = 0.15; // waves index

  const links = [
    { href: "/about", label: "About" },
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

  const angles = [30, 90, 150];

  return (
	<nav className=" relative flex w-full items-center justify-center ">

    <div className={`relative flex w-full items-center justify-center mx-auto`}>
    
      {circles.map((c, i) => (
            <div
            key={i}
            ref={(el) => (circleRefs.current[i] = el)}
            className="absolute rounded-full border-4 border-[#575757c8] shadow-2xl shadow-[#8c8c8c]"
            style={{
                width: c.size,
                height: c.size,
            }} />
      ))}
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