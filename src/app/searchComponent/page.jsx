"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import card1 from "@/assets/card1.webp";
import Image from "next/image";
import "@/css/swiperbg.css";
import LoadingAnimation from "@/components/Loading";

const SearchComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [result, setResult] = useState(false);
  const searchRef = useRef(null);

  const obj = [
    {
      postHeading:
        "Strategies to Elevate Brand Stories and Capture Audience Attention",
      imagePost: card1,
      date: "February 1, 2024",
    },
    {
      postHeading:
        "Strategies to Elevate Brand Stories and Capture Audience Attention",
      imagePost: card1,
      date: "February 1, 2024",
    },
  ];

  const handleSearchClick = () => {
    setIsSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10">
      <button onClick={handleSearchClick} aria-label="Search Icon">
        <FaSearch className="lg:text-black lg:dark:text-white text-white text-lg" />
      </button>
      {isSearchOpen && (
        <div ref={searchRef} className={`absolute top-7 right-0 delay-100`}>
          <div className="bg-[#04031D] h-auto py-3 w-[335px] ">
            <div className="flex items-center gap-3 px-3">
              <FaSearch className="text-white text-lg font-semibold" />
              <form className="w-full flex justify-between">
                <input
                  type="text"
                  placeholder="Search Headlines, News..."
                  className="bg-transparent placeholder:text-sm placeholder:text-gray-300 outline-none p-2 text-white"
                />
                <button type="submit">
                  <FaRegArrowAltCircleRight className="text-white hover:text-lime duration-100 place-self-end" />
                </button>
              </form>
            </div>
            {result && (
              <div className="h-[290px] border-t-[1px] border-gray-700 flex flex-col gap-2">
                {obj.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-between py-2 px-3 text-white border-b-[1px] border-gray-700"
                  >
                    <div className="relative h-14 w-16">
                      {!item?.imagePost ? <LoadingAnimation/> :
                      <Image
                      onError={(e) => console.error(e.target.id)}
                        src={`${item?.imagePost}`}is undefined
                        alt="Thumbnail"
                        layout="fill" 
                        objectFit="cover"
                        className="object-cover"
                      />
                      }
                    </div>
                    <div className="w-[75%]">
                      <h1 className="p text-[18px] font-semibold text-white hover:text-black duration-200">
                        {item.postHeading}
                      </h1>
                      <p className="text-[12px]">{item.date}</p>
                    </div>
                  </div>
                ))}
                <div className="w-full flex items-center justify-center">
                  <button className=" text-white text-xs font-bold  hover:bg-[#6DBA16] duration-200 py-2 lg:px-9 md:px-7 px-6">
                    More Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
