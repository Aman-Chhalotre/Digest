"use client";
import { FaRegArrowAltCircleRight, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import PostContext from "@/context/postContext";
import Link from "next/link";
import LoadingAnimation from "@/components/Loading";
import { useRouter } from "next/navigation";
import card1 from "@/assets/card1.webp";
import Recommendation from "@/components/Recommendation";

function Search() {
  const {
    advertisingPosts,
    marketingPosts,
    marketTrendsPosts,
    startupsPosts,
    techMovesPosts,
    handleShowMore,
  } = useContext(PostContext);

  const Suggestions = [
    ...advertisingPosts,
    ...marketingPosts,
    ...marketTrendsPosts,
    ...startupsPosts,
    ...techMovesPosts,
  ];

  return (
    <>
      <div className="lg:m-0 m-5">
        <div className="bg-[#DEFFB5] dark:bg-[#67883E] lg:h-[140px] border-t-[3px] border-black dark:border-white p-6">
          <div className="h-full flex lg:flex-row flex-col justify-between lg:items-center gap-2">
            <span className="text-black dark:text-white">
              <h1 className="text-[32px] font-bold">Search Results for: </h1>
              <h3 className="text-sm font-medium">
                Showing 51 results for your search
              </h3>
            </span>

            <div className="h-[60px] lg:w-[60%] flex items-center p-2 gap-2 border-[0.5px] border-gray-400 opacity-100 dark:border-opacity-50">
              <FaSearch className="text-[#67883E] dark:text-gray-300 text-lg font-semibold" />
              <form className="w-full">
                <input
                  type="text"
                  placeholder="Search Headlines, News..."
                  className="w-full bg-transparent caret-black placeholder:text-sm placeholder:text-gray-700 dark:placeholder:text-[#ffffffc0] placeholder:font-bold outline-none text-blck dark:text-white "
                />
              </form>
              <FaRegArrowAltCircleRight className="text-xl text-black hover:text-[#67883E] duration-100" />
            </div>
          </div>
        </div>
        {/* <div className="mt-10 flex flex-wrap justify-between gap-[10px]">
          {openMarketingData.cards.map((card, index) => (
            <Link href={`/blog/${card._id}`} key={index}>
            <div className="lg:h-96 md:w-[312px]" >
              <div className="h-[50%]">
                <div className="relative h-full w-full">
                  {!card?.image ? <LoadingAnimation/> : 
                  <Image
                  onError={(e) => console.error(e.target.id)}
                    alt="search image"
                    src={`${card?.image}` || `/${card1}`} // Fallback to a default image
                    layout="fill" // Ensures the image spans the container
                    objectFit="fill" // Matches the `object-cover` behavior
                    className="object-cover"
                  />
                  }
                </div>  
              </div>
              <div className="h-[50%] border dark:border-gray-700 pt-4 px-2 space-y-3">
                <h1 className="p text-2xl text-black dark:text-white dark:hover:text-black font-bold leading-7">
                  {card.postHeading}
                </h1>
                <p className="text-black dark:text-white text-xs ms-1">
                  {card.date}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </div> */}
        <Recommendation
          cardsData={Suggestions}
        />
        <div className="mt-5 w-full flex items-center justify-center">
          <button
            className="text-black hover:text-white text-xs font-bold bg-lime hover:bg-[#6DBA16] duration-200 py-2 lg:px-9 md:px-7 px-6"
            onClick={() => handleShowMore()}
          >
            Show More
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;
