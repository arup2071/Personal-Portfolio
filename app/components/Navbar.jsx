import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
    setMenuOpen(true);
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
    setMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <>
      {/* Background Image */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]">
        <Image src={assets.header_bg_color} alt="" className="w-full" />
      </div>

      {/* Background Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Navbar */}
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${
          isScroll ? "bg-white/60 backdrop-blur-lg" : ""
        }`}
      >
        <a href="#top">
          <Image
            src={assets.logo}
            alt="Logo"
            width={112}
            priority
            className="w-28 cursor-pointer mr-14"
          />
        </a>

        {/* Desktop Menu with Hover Animation */}
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${
            isScroll ? "" : "shadow-sm bg-white/60"
          } `}
        >
          {["Home", "About Me", "Services", "My Work", "Contact"].map((item) => (
            <li key={item}>
              <a
                className="font-Ovo hover:-translate-y-1 duration-300 transition-all inline-block"
                href={`#${item.toLowerCase().replace(" ", "")}`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 lg:gap-6">
          <button>
            <Image src={assets.moon_icon} alt="" className="w-6" />
          </button>
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo hover:bg-gray-100 duration-300 transition-all"
          >
            Contact <Image src={assets.arrow_icon} alt="" className="w-3" />
          </a>
          <button className="block md:hidden ml-3" onClick={openMenu}>
            <Image src={assets.menu_black} alt="" className="w-6" />
          </button>
        </div>

        {/* Sidebar Menu with Hover Animation */}
        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 ease-in-out"
        >
          <div className="absolute top-6 right-6" onClick={closeMenu}>
            <Image
              src={assets.close_black}
              alt=""
              className="w-4 cursor-pointer"
            />
          </div>

          {["Home", "About Me", "Services", "My Work", "Contact"].map((item) => (
            <li key={item}>
              <a
                className="font-Ovo text-lg hover:bg-white/40 hover:backdrop-blur-md hover:shadow-md duration-300 transition-all"
                onClick={closeMenu}
                href={`#${item.toLowerCase().replace(" ", "")}`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;