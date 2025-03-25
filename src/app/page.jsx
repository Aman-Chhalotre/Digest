"use client";
import Image from "next/image";
import SectionsCard from "@/components/SectionsCard";
import { HiArrowLongRight } from "react-icons/hi2";
import { PiArrowBendRightDownBold } from "react-icons/pi";
import { IoStarSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import "../css/swiperbg.css";

import Recommendation from "@/components/Recommendation";
import { AiFillThunderbolt } from "react-icons/ai";
import { GrFlag } from "react-icons/gr";
import Advertisement from "@/components/Advertisement";
import HomebottomSection from "@/components/HomebottomSection";
import Link from "next/link";
import { useContext,} from "react";
import PostContext from "@/context/postContext";
import card1 from "@/assets/card1.webp"
import LoadingAnimation from "@/components/Loading";

export default function Home() {


  const {trendingPost, trendingSection, recommendedSection, spotlightPost, spotlightSection, popularSection, mustReadSection,} = useContext(PostContext);


  function formatDate(dateString) {
    const date = new Date(dateString);
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${monthName} ${day}, ${year}`;
}

  return (
    <>
      <div className=" text-black dark:text-white duration-100 ">
        <div className="lg:min-h-[110vh] w-full flex lg:flex-row flex-col mb-3">
          <div className="bg-[#04031D] min-h-fit lg:w-[55%] w-full lg:pb-0 pb-7">
            <Link href={`/blog/${trendingPost._id}`} className="w-full">
              <div className="relative w-full lg:h-[50%] md:h-[80vh] sm:h-[70vh] h-[50vh]">
                {!trendingPost.imagePost ? (<LoadingAnimation/>) : 
                <Image
                  onError={(e) => console.error(e.target.id)}
                  src={`${trendingPost?.imagePost}` || `/${card1}`} // Fallback for when imagePost is undefined
                  alt="Post Image"
                  layout="fill" // Makes the image fill the container
                  objectFit="fill" // Ensures the image maintains its aspect ratio and covers the area
                  className=" lg:w-full w-full object-cover"
                />
                }
              </div>
              <div className="text-white h-auto lg:ps-[5%] ps-[2%] relative">
                <Link
                  href={`/category/${trendingPost?.category
                    ?.toLowerCase()
                    .replace(/[-\s]+/g, "")}`}
                  className="absolute top-[-18px] py-1 px-2 bg-[#C2FF74] text-black hover:text-white font-semibold text-[10px] tracking-[1px] uppercase"
                >
                  {trendingPost?.category}
                </Link>
                <div className="lg:space-y-5 space-y-3 pt-3">
                  <p className="p w-full cursor-pointer lg:text-[50px] md:text-[38px] text-[30px] font-bold lg:leading-[65px] md:leading-[50px] leading-[40px] hover:text-black duration-200">
                    {trendingPost?.postHeading}
                  </p>
                  <h2
                    className={`lg:text-xl md:text-base text-[14px] ms-[5px] text-gray-300`}
                  >
                    {trendingPost?.subheading}
                  </h2>
                  <div className=" text-xs flex gap-2">
                    By{" "}
                    <span className="font-bold">{trendingPost?.createdBy}</span>{" "}
                    |<h6 className="font-medium">{formatDate(trendingPost.createdAt)}</h6>|
                    <h6 className="font-medium">6 min Read</h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <SectionsCard
            Items={trendingSection}
            section="Trending"
            icon={<HiArrowLongRight className="text-5xl" />}
            withImage={false}
            imageFirst={false}
            drawer={false}
          />
        </div>
        {/* our news letter section */}
        <section id="newsLetter" className="lg:mx-0 mx-5">
          <div className="bg-[#DEFFB5] dark:bg-[#04031D] md:h-[470px] xs:h-[340px] h-fit border-t-[6px] border-black dark:border-lime flex justify-center items-center ">
            <div className="h-full lg:py-9 md:py-7 py-4 lg:px-[62px] md:px-[45px] px-[15px] flex flex-col justify-between sm:gap-0 gap-2">
              <h1 className="lg:text-[75px] md:text-[60px] text-[30px] font-bold flex items-center xs:leading-none leading-8">
                Our Newsletter <PiArrowBendRightDownBold className="h-14" />
              </h1>
              <h3 className="lg:text-[28px] md:text-[22px] text-[15px] font-[400]">
                Subscribe now for a front-row seat to the latest in technology,
                marketing strategies, and market trends - Your Gateway to
                Innovation
              </h3>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className=" md:placeholder:text-xl xs:placeholder:text-lg placeholder:text-base  placeholder:text-gray-600 md:h-[78px] sm:h-[72px] h-[50px] sm:p-4 p-2 xs:w-auto w-56 border border-black text-black font-bold text-xl"
              />
              <button className="md:w-[255px] xs:w-[190px] w-[150px] md:py-4 xs:py-3 py-1 mt-2 md:text-xl xs:text-lg text-sm font-bold text-white dark:text-black hover:text-black bg-black dark:bg-lime hover:bg-[#C2FF74] dark:hover:bg-white duration-200">
                Sign Up Now
              </button>
              <div className="space-x-2">
                <input type="checkbox" name="checkbox" required />
                <label
                  htmlFor="checkbox"
                  className="md:text-[14px] text-[12px]"
                >
                  I have read and agree to the terms & conditions
                </label>
              </div>
            </div>
          </div>
        </section>
        <Recommendation
          label="Recommended"
          icon={<HiArrowLongRight />}
          heading={
            "Our Recommended Posts are a curated exploration of the most significant trends, innovations, and insights that are making waves in Technology, from cutting-edge technologies to revolutionary market strategies."
          }
          cardsData={recommendedSection}
        />
        <div className="lg:min-h-[110vh] flex lg:flex-row flex-col-reverse mt-16 lg:mx-0 mx-5 ">
          <SectionsCard
            Items={spotlightSection}
            section="Spotlight"
            icon={<IoStarSharp className="text-[38px]" />}
            withImage={true}
            imageFirst={true}
          />
          <div className="bg-[#DEFFB5] dark:bg-[#04031D] lg:min-h-[105vh]  lg:w-[55%] w-full">
            <Link href={`/blog/${spotlightPost._id}`} className="w-full">
              <div className="relative lg:h-[50%] md:h-[80vh] sm:h-[70vh] h-[50vh] w-full">
              {!spotlightPost?.imagePost ? (<LoadingAnimation/>) : 
                <Image
                onError={(e) => console.error(e.target.id)}
                  src={`${spotlightPost?.imagePost}`} // Fallback to a default image if `imagePost` is undefined
                  alt="Spotlight Post"
                  layout="fill" // Ensures the image fills the container
                  objectFit="contain" // Matches Tailwind's `object-contain`
                  className="object-contain lg:h-[50%] w-full" // Optional, matches styling for clarity
                />
              }
              </div>
              <div className="text-black dark:text-white lg:ps-[5%] ps-[2%] relative">
                <Link
                  href={`/category/${spotlightPost?.category
                    ?.toLowerCase()
                    .replace(/[-\s]+/g, "")}`}
                  className="absolute top-[-18px] py-1 px-2 bg-[#C2FF74] hover:text-white duration-150 text-black font-semibold text-[10px] tracking-[1px] uppercase"
                >
                  {spotlightPost?.category}
                </Link>
                <div className="lg:space-y-5 space-y-3 py-4">
                  <p className="p cursor-pointer lg:text-[52px] md:text-[45px] text-[30px] font-bold lg:leading-[65px] md:leading-[50px] leading-[40px] hover:text-black duration-200">
                    {spotlightPost?.postHeading}
                  </p>
                  <h2 className="lg:text-xl md:text-base text-[13px] text-gray-700 dark:text-white">
                    {spotlightPost?.subheading}
                  </h2>
                  <div className=" text-xs flex gap-2">
                    By{" "}
                    <span className="font-bold">
                      {spotlightPost?.createdBy}
                    </span>{" "}
                    |<h6 className="font-medium">{formatDate(spotlightPost.createdAt)}</h6>|
                    <h6 className="font-medium">6 min Read</h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Advertisement />
        <div className="min-lg:h-[90vh] h-auto w-full flex lg:flex-row flex-col mb-3 mt-16">
          <div className="bg-[#D9F3FF] dark:bg-[#477286] min-h-[94%] lg:w-[50%] flex items-center justify-center">
            <div className="text-black lg:ps-[5%] ps-[2%]">
              <div className="space-y-6 lg:pt-3 md:pt-10  md:px-10 lg:py-0 md:py-16 py-5 text-black dark:text-white">
                <p className="cursor-pointer lg:text-[50px] md:text-[38px] text-[30px] font-bold lg:leading-[65px] md:leading-[50px] leading-[40px]">
                  We're committed to Elevating Your Tech Experience
                </p>
                <h2 className="lg:text-xl md:text-base text-sm text-gray-700 dark:text-white italic">
                  Our dedication extends to your technology needs. Stay informed
                  and inspired as we provide timely updates on phones, green
                  energy, industry developments, laptop tech, and the
                  fascinating world of science.
                </h2>
                <div>
                  <h1 className="w-fit md:py-3 py-2 md:px-12 px-7 hover:bg-lime bg-black text-white hover:text-black duration-200 font-bold flex items-center gap-3">
                    <span>
                      <FaHeart />
                    </span>
                    About US
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <SectionsCard
            Items={popularSection}
            section="Popular"
            icon={<AiFillThunderbolt className="text-[38px] text-orange-500" />}
            withImage={true}
            imageFirst={false}
          />
        </div>
        <Recommendation
          label="Must Read"
          icon={<GrFlag />}
          heading={""}
          cardsData={mustReadSection}
        />
        <Advertisement />
        <HomebottomSection />
      </div>
    </>
  );
}
