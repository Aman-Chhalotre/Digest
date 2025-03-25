"use client";
import Image from "next/image";
import { HiArrowLongRight } from "react-icons/hi2";
import { PiArrowBendRightDownBold } from "react-icons/pi";

import card1 from "@/assets/card1.webp";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import PostContext from "@/context/postContext";
import LoadingAnimation from "@/components/Loading";

function TodayandTrendingSection({
  category,
  postHeading,
  date,
  image,
  label,
}) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${monthName} ${day}, ${year}`;
  }
  return (
    <>
      <div className={` lg:py-4 py-1 dark:border-white mx-5`}>
        <section className="space-y-5">
          {image ? (
            <div className="relative md:h-[220px] sm:h-[420px] h-[200px] w-full">
              <Image
                onError={(e) => console.error(e.target.id)}
                src={`${image}`} // Fallback to a default image if `image` is undefined
                alt="Dynamic Image"
                layout="fill" // Ensures the image fills the container
                objectFit="cover" // Matches the behavior of `w-full` and responsive height
                className="object-cover h-full w-full"
              />
            </div>
          ) : (
            <Link
              href={`/category/${category
                ?.toLowerCase()
                .replace(/[-\s]+/g, "")}`}
              className="md:ms-0 ms-5 py-[3px] px-2 bg-[#C2FF74] hover:text-white hover:bg-[#04031D] duration-150 text-black font-semibold text-[10px] uppercase"
            >
              {category}
            </Link>
          )}
          <ul className="lg:space-y-2 space-y-0.5 flex">
            <li className={`border-b border-gray-300 lg:pb-4 pb-2 flex gap-3`}>
              <div>
                <div className="flex items-center">
                  <p className="p hover:text-white dark:hover:text-black duration-200 lg:text-[26px] md:text-[28px] text-[21px] font-[700] cursor-pointer md:leading-8 leading-7">
                    <span>{postHeading}</span>
                  </p>
                </div>
                <div
                  className={`text-gray-500 dark:text-white text-xs flex gap-2 mt-3`}
                >
                  <h6 className="font-medium">{formatDate(date)}</h6>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

function StartupSection({ postHeading, date, image }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${monthName} ${day}, ${year}`;
  }
  return (
    <>
      <div
        className={`  h-[380px]  lg:py-4 py-1 dark:border-white mx-5 relative `}
      >
        <section className="space-y-5 h-full">
          <div className="relative h-full w-full -z-10">
            {!image ? (
              <LoadingAnimation />
            ) : (
              <Image
                onError={(e) => console.error(e.target.id)}
                src={`${image}`} // Fallback to a default image if `image` is undefined
                alt={postHeading}
                layout="fill" // Ensures the image spans the entire container
                objectFit="cover" // Matches `object-cover` for background-like behavior
                priority // Ensures the image is loaded quickly if it's above the fold
              />
            )}
          </div>

          <div className="h-full w-full absolute bottom-0 inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4 pb-8">
            <div className="h-full flex flex-col justify-end">
              <div className="flex items-center">
                <p className="p text-white hover:text-black dark:hover:text-black duration-200 lg:text-[26px] md:text-[28px] text-[24px] font-[700] cursor-pointer leading-8">
                  <span>{postHeading}</span>
                </p>
              </div>
              <div className={`text-white text-xs flex gap-2 mt-3 ms-2`}>
                <h6 className="font-medium">{formatDate(date)}</h6>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function SponsoredSection({ category, text, image, by }) {
  return (
    <>
      <div className="bg-[#04031D] lg:min-h-[580px]">
        <div className="relative lg:h-[360px] h-[300px] w-full">
          {!image ? (
            <LoadingAnimation />
          ) : (
            <Image
              onError={(e) => console.error(e.target.id)}
              src={`${image}`} // Fallback to a default image
              alt="Responsive Image"
              layout="fill" // Ensures the image spans the container
              objectFit="cover" // Matches `object-cover` for fitting behavior
              className="object-cover"
            />
          )}
        </div>
        <div className="text-white lg:ps-[5%] ps-[2%] relative">
          <Link
            href={`/category/${category?.toLowerCase().replace(/[-\s]+/g, "")}`}
            className="absolute top-[-18px] py-1 px-2 bg-[#C2FF74]  hover:text-white duration-150 text-black font-semibold text-[10px] tracking-[1px] uppercase"
          >
            {category}
          </Link>
          <div className="space-y-6 pt-6 px-4">
            <p className="p cursor-pointer sm:text-[38px] text-[22px] font-bold sm:leading-[50px] leading-[30px] hover:text-black duration-200">
              {text}
            </p>
            <div className=" text-xs flex ps-2 pb-5">
              <span className="flex gap-3">
                Sponsored by{" "}
                <Image src={""} alt="sponsored by" className="size-10" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HomebottomSection() {
  const [techMoves, setTechMoves] = useState([]);
  const [startups, setStartups] = useState([]);
  const [sponsored, setSponsored] = useState([]);

  const { posts } = useContext(PostContext);

  useEffect(() => {
    const latestPosts = [...posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 50);
      
    setTechMoves(
      [...latestPosts]
        .filter((item) => item?.category === "tech moves")
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
    );
    setStartups(
      [...latestPosts]
        .filter((item) => item?.category === "startups")
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
    );
    setSponsored(
      [...latestPosts]
        .filter((item) => item?.isSponsored === true)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
    );
  }, [posts]);

  return (
    <>
      <div className="flex lg:flex-row flex-col lg:gap-3 gap-5 w-full">
        <div className="lg:w-[50%] w-full space-x-3">
          <h2 className="text-3xl font-bold flex items-center lg:ms-0 ms-6 lg:mb-0 mb-5">
            <HiArrowLongRight className="sm:text-5xl text-2xl" /> &nbsp;
            <span className="lg:text-3xl sm:text-5xl text-2xl"> Today</span>
          </h2>
          {posts.slice(0, 13).map((item, index) => (
            <div className="" key={index}>
              <Link href={`/blog/${item._id}`} className="h-auto w-full">
                <TodayandTrendingSection
                  category={item?.category}
                  postHeading={item?.postHeading}
                  date={item?.createdAt}
                />
              </Link>
            </div>
          ))}
        </div>
        {!sponsored && (
          <div className="lg:mx-0 mx-5 lg:mt-0 mt-10">
            <h2 className="text-3xl font-bold flex items-center mb-4">
              <span className="lg:text-3xl sm:text-5xl text-2xl ">
                🔔 Sponsored
              </span>
            </h2>
            {sponsored.map((item, index) => (
              <Link href={`blog/${item._id}`} key={index}>
                <SponsoredSection
                  label={item.category}
                  text={item.postHeading}
                  image={item.imagePost}
                  by={item.companyLogo}
                  category={item.category}
                />
              </Link>
            ))}
          </div>
        )}
        <div className="lg:w-[50%] w-full lg:mt-0 mt-10">
          <div>
            <h2 className="text-3xl font-bold flex items-center ms-6 lg:mb-0 mb-5">
              <span className="lg:text-3xl sm:text-5xl text-2xl">
                {" "}
                Tech Moves
              </span>
              &nbsp;
              <PiArrowBendRightDownBold className="lg:text-xl text-3xl mt-3" />
            </h2>
            <div className="grid lg:grid-cols-1 md:grid-cols-3 grid-cols-1 ">
              {techMoves?.map((item, index) => (
                <div className="" key={index}>
                  <Link href={`blog/${item._id}`}>
                    <TodayandTrendingSection
                      category={item.category}
                      postHeading={item.postHeading}
                      date={item.createdAt}
                      image={item.imagePost}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-auto h-auto w-full">
            <h2 className="text-3xl font-bold ms-6 flex items-center lg:mb-0 mb-5 lg:mt-8 mt-10">
              <span className="lg:text-3xl sm:text-5xl text-2xl">Startups</span>
              &nbsp;
              <PiArrowBendRightDownBold className="lg:text-xl text-3xl mt-3" />
            </h2>
            <div className="grid lg:grid-cols-1 md:grid-cols-3 grid-cols-1 md:gap-2 gap-5">
              {startups.map((item, index) => (
                <div className="" key={index}>
                  <Link href={`blog/${item._id}`}>
                    <StartupSection
                      postHeading={item.postHeading}
                      date={item.createdAt}
                      image={item.imagePost}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomebottomSection;
