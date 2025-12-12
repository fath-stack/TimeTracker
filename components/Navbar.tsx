"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from 'lucide-react';

const Navbar = () => {

  const [isOpen, setisOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const linkRef = useRef<HTMLDivElement | null> (null);
  const tlRef = useRef<gsap.core.Timeline | null> (null);

  const circles = [
      { size: 5 },
      { size: 10 },
      { size: 15 },
      { size: 20 },
      { size: 30 },
    ];
    
  useEffect(() => {
  
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

     if (linkRef.current) {
      gsap.fromTo(
        linkRef.current,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 3, 
          ease: "easeOut"
        }
      ).delay(2);
     };

    circles.forEach((c, i) => {
      tl.fromTo(
        circleRefs.current[i],
        { width: '5rem', height: '5rem', opacity: 0},
        {
          width: `${c.size}rem`,
          height: `${c.size}rem`,
          opacity: 1,
          duration: (i + 0.7) * 0.15,
          delay: 0.1,
          ease: "easeOut",
        },
      );
    });
  }, []);

  const links = [
    { href: "/about", label: "About" },
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

  // Toggle menu open/close
  const toggleMenu = () => {
    if(!tlRef.current) return null;
    if(!isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
    setisOpen(prevState => !prevState);
  };

  const angles = [30, 90, 150];

 return (
    <nav className="fixed z-0 flex w-full items-center justify-center -translate-y-20">
      <div className={`relative flex w-full items-center justify-center mx-auto`}>
        <button
          onClick={toggleMenu}
          className="absolute flex items-center justify-center size-10 z-5 left-1/2 transform -translate-x-1/2 -translate-y-0.9 border text-zinc-400 rounded-full"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
    
        {circles.map((c, i) => (
          <div
            key={i}
            ref={el => { circleRefs.current[i] = el; }}
            className="absolute rounded-full border-4 border-[#575757c8] shadow-2xl shadow-[#8c8c8c]"
            style={{
              width: c.size,
              height: c.size,
            }}
          />
        ))}

        <div className="relative size-60" ref={linkRef} >
          {isOpen ? links.map((link, index) => {
            const angle = angles[index];
            // turn angles to radian
            const rad = (angle * Math.PI) / 180;

            const radius = 155; 
            const x = radius + radius * Math.cos(rad);
            const y = radius + radius * Math.sin(rad);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`absolute flex w-20 transition duration-100 ${isOpen ? 'opacity-100' : 'opacity-0'} items-center justify-center -translate-x-18 shadow-2xs shadow-[#8a8c8acd] bg-[#8c8c8c42] text-white px-3 py-1 rounded-full hover:bg-zinc-700`}
                style={{ left: x, top: y }}
              >
                {link.label}
              </Link>
            );
          }) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar