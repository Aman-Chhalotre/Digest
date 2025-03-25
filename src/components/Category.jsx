"use client";
import Image from "next/image";
import "../css/swiperbg.css";
import Advertisement from "./Advertisement";
import Recommendation from "./Recommendation";
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";
import card1 from "@/assets/card1.webp";
import LoadingAnimation from "./Loading";

function Category({
  category,
  para,
  recommendeddata,
  mustReaddata,
  handleShowMore,
}) {
  return (
    <>
      <div>
        <div className="lg:h-[95vh] flex lg:flex-row flex-col lg:mx-0 mx-5 lg:pt-2 pt-4">
          <div className="h-full lg:w-[45%] flex lg:justify-center items-center lg:border-t border-t-[5px] lg:border-l-[5px] border-l lg:border-b lg:border-r-0 border-r border-black dark:border-lime">
            <div className="lg:w-[450px] space-y-5 lg:mt-[-120px] py-5 m-5">
              <h1 className="lg:text-5xl md:text-4xl text-3xl bg-black dark:bg-white w-fit pb-2 text-white dark:text-black font-bold">
                {category}
              </h1>
              <p className="italic font-medium text-black dark:text-white text-sm leading-6">
                {para}
              </p>
            </div>
          </div>
          <div className="h-full lg:w-[55%]">
            <Link href={`/blog/${recommendeddata.id}`}>
              <div className="bg-[#111511] h-full text-white overflow-hidden shadow-md w-full cursor-pointer">
                {/* Image Section */}
                <div className="relative w-full h-[400px]">
                  {!recommendeddata?.image ? (
                    <LoadingAnimation />
                  ) : (
                    <Image
                      onError={(e) => console.error(e.target.id)}
                      src={`${recommendeddata?.image}` || `/${card1}`} // Fallback to a default image if `recommendeddata.image` is undefined
                      alt={recommendeddata.category} // Fallback alt text
                      layout="fill" // Makes the image span the parent container
                      objectFit="fill" // Matches `object-cover`
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5  relative">
                  {/* Category Tag */}
                  <span className="absolute top-[-29.5px] inline-block hover:text-white duration-200 bg-[#C2FF74] text-[#010328] sm:text-[9px] text-[8px] tracking-[1px] font-bold sm:px-3 px-2 sm:py-2 py-1 uppercase">
                    {recommendeddata.category}
                  </span>

                  {/* Title */}
                  <h2 className="p lg:text-[50px] sm:text-5xl text-2xl leading-tight font-[700] hover:text-black duration-200">
                    {recommendeddata.title}
                  </h2>

                  <div
                    className={`text-white text-xs flex gap-2 mt-3 sm:ms-5 ms-2`}
                  >
                    By{" "}
                    <span className="text-white font-bold">
                      {recommendeddata.author}
                    </span>{" "}
                    |<h6 className="font-medium">{recommendeddata.date}</h6> |
                    <h6 className="font-medium">6 min Read</h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Advertisement />
        <Recommendation
          label={`Latest ${category}`}
          icon={<HiArrowLongRight />}
          heading={""}
          cardsData={mustReaddata}
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

export default Category;
