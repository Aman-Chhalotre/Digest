import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Current scroll position
      const pageHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
      if (scrollPosition > pageHeight / 1/2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-5 sm:py-2 py-1 sm:px-3 px-2 bg-gray-800 text-white shadow-lg transition-opacity hover:bg-[#6DBA16] hover:-translate-y-1 duration-300  ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <MdOutlineKeyboardDoubleArrowUp className='text-2xl font-extralight'/>
    </button>
  );
};

export default ScrollToTopButton;
