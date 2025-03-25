"use client";
import SectionsCard from "@/components/SectionsCard";
import { GrFlag } from "react-icons/gr";
import Image from "next/image";
import Advertisement from "@/components/Advertisement";
import Recommendation from "@/components/Recommendation";
import { HiArrowLongRight } from "react-icons/hi2";
import PostContext from "@/context/postContext";
import { useContext } from "react";
import card1 from '@/assets/card1.webp'
import LoadingAnimation from "@/components/Loading";
import Link from "next/link";

function Blog() {
  const { trendingPost, mustReadSection, latestSection, handleShowMore } =
    useContext(PostContext);

  return (
    <>
      <div>
        <div className="lg:h-[110vh] w-full flex lg:flex-row flex-col-reverse">
          <SectionsCard
            Items={mustReadSection}
            section="Must Read"
            icon={<GrFlag className="text-5xl" />}
            withImage={true}
            imageFirst={true}
          />
          <div className="bg-[#04031D] lg:h-[95.5%] h-fit lg:w-[55%] w-full lg:pb-0 pb-7">
            <Link href={`/blog/${trendingPost?._id}` } className="w-full">
            <div className="relative w-full lg:h-[50%] md:h-[80vh] sm:h-[70vh] h-[50vh]">
              {!trendingPost?.imagePost ? <LoadingAnimation/> : 
              <Image
                onError={(e) => console.error(e.target.id)}
                src={`${trendingPost?.imagePost}` || `/${card1}`} // Fallback to a default image
                alt="Trending Post Image"
                layout="fill" // Makes the image fill the container
                objectFit="fill" // Matches `object-cover` behavior
                className="object-cover"
              />
              }
            </div>
            
            <div className="text-white lg:ps-[5%] ps-[2%] relative">
              <span className="absolute top-[-18px] py-1 px-2 bg-[#C2FF74] text-black font-semibold text-[10px] tracking-[1px] uppercase">
                {trendingPost.category}
              </span>
              <div className="lg:space-y-5 space-y-3 pt-3">
                <p className="p cursor-pointer lg:text-[52px] md:text-[40px] text-[30px] font-bold lg:leading-[65px]  md:leading-[50px] leading-[40px] hover:text-black duration-200">
                  {trendingPost.postHeading}
                </p>
                <h2 className="lg:text-xl md:text-base text-[14px] text-white">
                  {trendingPost.subheading}
                </h2>
                <div className=" text-xs flex gap-2">
                  By <span className="font-bold">{trendingPost.createdBy}</span>{" "}
                  |<h6 className="font-medium">January 31, 2024</h6>|
                  <h6 className="font-medium">6 min Read</h6>
                </div>
              </div>
            </div>
            </Link>
          </div>
        </div>
        <Advertisement />
        <Recommendation
          label={`Latest News`}
          icon={<HiArrowLongRight />}
          heading={""}
          cardsData={latestSection}
        />
        <div className="w-full flex items-center justify-center">
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

export default Blog;
