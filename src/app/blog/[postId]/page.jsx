"use client";
import Image from "next/image";
import img from "@/assets/card3.jpg";
import card1 from "@/assets/card1.webp";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiArrowLongRight, HiMiniLink } from "react-icons/hi2";
import { FaPrint } from "react-icons/fa";
import { TfiMoreAlt, TfiThought } from "react-icons/tfi";
import { IoBookOutline } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { BsDashLg, BsTwitter } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineSettingsRemote } from "react-icons/md";
import { GoInbox } from "react-icons/go";
import { FaShareFromSquare } from "react-icons/fa6";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";

import "@/css/postSocialBoxes.css";
import { AiFillThunderbolt } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Recommendation from "@/components/Recommendation";
import axios from "axios";
import PostContext from "@/context/postContext";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/components/Loading";

function Post({ params }) {
  const [postData, setPostData] = useState({});
  const sectionRefs = useRef([]);

  const { recommendedSection } = useContext(PostContext);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href; // Get the current page's URL
      navigator.clipboard
        .writeText(currentUrl) // Copy to clipboard
        .then(() => {
          alert("Page URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy URL: ", err);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/posts/allpost/${params.postId}`
        );

        // Process the fetched data
        const processedData = {
          ...response.data.data,
          contentSections: response.data.data.contentSections.map(
            (section) => ({
              ...section,
              descriptionParts: splitTextByPattern(section.contentDescription),
            })
          ),
        };

        setPostData(processedData);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchData();
  }, [params.postId]);

  let description = postData.description;

  function splitTextByPattern(text) {
    // Regex pattern to find the split point

    let regex;
    if (text?.length < 650) {
      regex = /(.{120,}?\.\s)(?=[A-Z])/;
    } else {
      regex = /(.{500,}?\.\s)(?=[A-Z])/;
    }

    // Find the match
    const match = text?.match(regex);

    if (match && match.index !== undefined) {
      // Split the string into two parts
      const part1 = text?.slice(0, match.index + match[0].length).trim();
      const part2 = text?.slice(match.index + match[0].length).trim();
      return [part1, part2];
    }

    // If no match is found, return the original text as a single part
    return [text?.trim()];
  }

  const result = splitTextByPattern(description);

  const postDescription1 = result[0];
  const postDescription2 = result[1];

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
    });
  };

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
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format

    return `${monthName} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
}

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full h-[50vh] md:h-[80vh] mt-5">
          {!postData?.imagePost ? <LoadingAnimation/> : 
          <Image
            onError={(e) => console.error(e.target.id)}
            src={`${postData?.imagePost}` || `/${card1}`}
            alt="Post Image"
            layout="fill"
            objectFit="contain"
            className="h-full w-full "
          />
          }
        </div>

        <div className="lg:w-[57%] md:w-[70%] w-[90%] space-y-7 text-black dark:text-white">
          <Link
            href={`/category/${postData?.category
              ?.toLowerCase()
              .replace(/[-\s]+/g, "")}`}
            className="py-1 px-2 bg-[#C2FF74] text-black hover:bg-[#04031D] hover:text-white duration-200 font-semibold text-[10px] tracking-[1px] uppercase cursor-pointer"
          >
            {postData.category}
          </Link>
          <h1 className=" font-bold lg:text-[50px] md:text-[38px] text-[25px] lg:leading-[60px] md:leading-[40px] leading-8">
            {postData.postHeading}
          </h1>
          <p className=" md:text-base text-[14px]">{postData.subheading}</p>
          <div className="h-40 border-t-4 flex flex-col justify-around border-b-4 pb-4">
            <div className="flex md:flex-row flex-col items-center md:gap-5 ">
              <div className="Container w-fit flex items-center gap-5">
                {/* Facebook Icon */}
                <a href="https://www.linkedin.com/company/105723566/admin/dashboard/" target="blank" className="relative group">
                  <FaLinkedin className="social text-black dark:text-white text-[20px] duration-200 cursor-pointer" />
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1 shadow-lg">
                    LinkedIn
                  </div>
                </a>

                {/* Twitter Icon */}
                <a
                  href="https://www.instagram.com/startupdigest.in/profilecard/?igsh=MTd0eWdlNHZyN2I5"
                  target="blank"
                  className="relative group"
                >
                  <FaInstagram className="social text-black dark:text-white text-[20px] duration-200 cursor-pointer" />
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1  shadow-lg">
                    Instagram
                  </div>
                </a>

                {/* Email Icon */}
                <div className="relative group">
                  <a
                    href="mailto:" /* Email id */
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <MdMail className="social text-black dark:text-white text-[22px] duration-200 cursor-pointer" />
                  </a>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1 shadow-lg">
                    Email
                  </div>
                </div>

                {/* Copy Link Icon */}
                <div className="relative group">
                  <HiMiniLink
                    className="social text-black dark:text-white text-[22px] duration-200 cursor-pointer"
                    onClick={copyToClipboard}
                  />
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1 shadow-lg">
                    Copy Link
                  </div>
                </div>

                {/* Print Icon */}
                <div
                  className="relative group"
                  onClick={() => {
                    window.print();
                  }}
                >
                  <FaPrint className="social text-black dark:text-white text-[20px] duration-200 cursor-pointer" />
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1  shadow-lg">
                    Print
                  </div>
                </div>

                {/* More Options Icon */}
                <div className="relative group">
                  <TfiMoreAlt className="social text-black dark:text-white text-[20px] duration-200 cursor-pointer" />
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black  text-white text-xs px-2 py-1 shadow-lg">
                    More Options
                  </div>
                </div>
              </div>

              <span className="text-gray-500 text-xs cursor-none">|</span>
              <p>6 min Read</p>
            </div>
            <div className="flex items-center space-x-4">
              <Image
              onError={(e) => console.error(e.target.id)}
                src={img}
                alt="Author"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <p className="text-sm dark:text-gray-300">
                  By{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {postData.createdBy}
                  </span>{" "}
                  {/* - {postData.designation} */}
                </p>
                <p className="text-sm font-normal">
                  Last updated: {formatDate(postData.updatedAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-1">
            <span className="text-8xl font-bold align-text-top mt-[-20px]">
              {}
            </span>
            <h1 className="md:text-[17px] text-[14px] ">{postDescription1}</h1>
          </div>
          <Accordion defaultExpanded className="bg-white dark:bg-[#04031D]">
            <AccordionSummary
              expandIcon={
                <MdExpandMore className="text-3xl hover:text-lime duration-200" />
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h1 className="flex items-center gap-2">
                <IoBookOutline className="text-[#59cf59]" />
                <span className="text-2xl font-bold text-black dark:text-white">
                  Contents
                </span>
              </h1>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {Array.isArray(postData.contentSections) &&
                    postData.contentSections.map((content, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border-b cursor-pointer group"
                        onClick={() => scrollToSection(index)}
                      >
                        {/* Number Badge */}
                        <div className="flex items-center justify-center w-7 h-7 group-hover:bg-[#6DBA16] duration-200 bg-gray-800 text-white text-sm font-bold ">
                          {index + 1}
                        </div>
                        {/* Article Text */}
                        <p className="text-gray-800 md:text-base text-[14px] dark:text-gray-200 font-bold group-hover:text-[#6DBA16] duration-200">
                          {content.contentHeading}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <div>
            <p className="md:text-[17px] text-[14px] md:leading-7 leading-5">{postDescription2}</p>
          </div>
          {/* <div className="w-full flex flex-col items-center text-center space-y-3 font-bold py-10">
            <div className="w-[88%]">
              <FaQuoteLeft className=" justify-self-center text-3xl text-[#6DBA16]" />
              <p className="text-[23px]">
                You know what your problem is, it’s that you haven’t seen enough
                movies – all of life’s riddles are answered in the movies.
              </p>
              <p className="text-sm font-medium italic flex items-center justify-center gap-2 my-5">
                <BsDashLg className="text-[#6DBA16]" /> Steve Martin
              </p>
            </div>
          </div> */}
          {Array.isArray(postData.contentSections) &&
            postData.contentSections.map((content, index) => (
              <div
                className="w-full md:space-y-6 space-y-4"
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
              >
                <h1 className="md:text-3xl text-lg font-bold">{content.contentHeading}</h1>
                <p className="md:text-[17px] text-[14px] md:leading-7 leading-5">
                  {content.descriptionParts?.[0]}
                </p>
                {content.contentType === "image" && (
                  <div className="relative md:h-[70vh] h-[50vh] sm:min-w-[70vw] w-full justify-self-center">
                    {!content?.imageUpload ? <LoadingAnimation/> :
                    <Image
                      onError={(e) => console.error(e.target.id)}
                      src={`${content?.imageUpload}`|| `/${card1}`}
                      alt="Content Image"
                      layout="fill"
                      objectFit="fill"
                      className="object-contain h-full w-full"
                    />
                    
                    }
                  </div>
                )}
                {content.contentType == "list" && (
                  <div className="space-y-3">
                    {content?.listItems?.map((point, idx) => (
                      <p className="flex items-center" key={idx}>
                        <span className=" text-[#00D084] text-base mr-2 -rotate-[13deg]">
                          <AiFillThunderbolt />
                        </span>
                        {point}
                      </p>
                    ))}
                  </div>
                )}
                {content.contentType == "quote" && (
                  <div className="w-full flex flex-col items-center text-center space-y-3 font-bold py-10">
                    <div className="w-[88%]">
                      <FaQuoteLeft className=" justify-self-center text-3xl text-[#6DBA16]" />
                      <p className="text-[23px]">{content.quoteText}</p>
                      <p className="text-sm font-medium italic flex items-center justify-center gap-2 my-5">
                        <BsDashLg className="text-[#6DBA16]" />{" "}
                        {content.quoteAuthor}
                      </p>
                    </div>
                  </div>
                )}
                <p className="md:text-[17px] text-[14px] md:leading-7 leading-5">
                  {content.descriptionParts?.[1]}
                </p>
              </div>
            ))}

          <div className="border-t border-gray-900 py-6">
            {/* <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="flex items-center gap-1">
                  {" "}
                  <IoPricetagsOutline /> TAGGED:
                </span>
                <Link
                  href={""}
                  className="text-black dark:text-white font-bold hover:text-lime dark:hover:text-lime duration-200"
                >
                  Digital
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center gap-1">
                  <MdOutlineSettingsRemote /> SOURCES:
                </span>
                <Link
                  href={""}
                  className="text-black dark:text-white font-bold  hover:text-lime dark:hover:text-lime duration-200"
                >
                  rubynews.com, timenews.com
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center gap-1">
                  <GoInbox /> VIA:
                </span>
                <Link
                  href={""}
                  className="text-black dark:text-white font-bold  hover:text-lime dark:hover:text-lime duration-200"
                >
                  ThemeRuby, MarsNews
                </Link>
              </div>
            </div> */}

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span>
                  <FaShareFromSquare />
                </span>
                <h3 className="font-semibold  text-2xl sm:block hidden">
                  Share This Article
                </h3>
              </div>
              <div className="Container flex items-center md:space-x-4 space-x-2 mt-4">
                <a href="https://www.linkedin.com/company/105723566/admin/dashboard/" target="blank" className="relative group">
                  <button className="social flex items-center space-x-2 md:px-4 px-2 py-2 bg-gray-100  hover:bg-gray-200">
                    <span className="md:text-xl text-lg">
                      <FaLinkedin className="text-black" />
                    </span>
                    <span className="text-black text-xs font-bold">
                      LinkedIn
                    </span>
                  </button>
                  <div className="w-fit absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1  shadow-lg">
                    LinkedIn
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/startupdigest.in/profilecard/?igsh=MTd0eWdlNHZyN2I5"
                  target="blank"
                  className="relative group"
                >
                  <button className="social flex items-center space-x-2 md:px-4 px-2 py-2 bg-gray-100  hover:bg-gray-200">
                    <span className="md:text-xl text-lg">
                      <FaInstagram className="text-black" />
                    </span>
                    <span className="text-black text-xs font-bold">
                      Instagram
                    </span>
                  </button>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1 rounded shadow-lg">
                    Instagram
                  </div>
                </a>

                {/* Copy Link Button */}
                <div className="relative group">
                  <button className="social flex items-center space-x-2 md:px-4 px-1 py-2 bg-gray-100 rounded hover:bg-gray-200">
                    <span
                      className="md:text-xl text-lg"
                      onClick={copyToClipboard}
                    >
                      <HiMiniLink className="text-black" />
                    </span>
                  </button>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1 shadow-lg">
                    Copy Link
                  </div>
                </div>

                {/* More Options */}
                <div className="relative group">
                  <span className="text-black dark:text-white hover:text-lime duration-200">
                    <TfiMoreAlt />
                  </span>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1  shadow-lg">
                    More Options
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className=" mx-auto p-4">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="mr-2">
                <TfiThought />
              </span>{" "}
              Leave a Comment
            </h2>
            <p className="text-sm text-gray-600 dark:text-white mt-2">
              Your email address will not be published. Required fields are
              marked <span className="text-red-500">*</span>
            </p>

            <form className="mt-4 space-y-4">
              <div>
                <textarea
                  className="w-full border border-black text-black p-3 h-52 outline-none"
                  placeholder="Leave a Comment"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  className="w-full border border-black texg-black  p-3 outline-none"
                  placeholder="Your name"
                  required
                />
                <input
                  type="email"
                  className="w-full border border-black text-black  p-3 outline-none"
                  placeholder="Your email"
                  required
                />
                <input
                  type="url"
                  className="w-full border border-black text-black p-3 outline-none"
                  placeholder="Your website"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="-blackext-g outline-none size-5"
                />
                <label className="text-gray-600 dark:text-white text-sm">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-[#6DBA16] text-white font-bold px-6 py-3 transition"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div> */}
        </div>
        <Recommendation
          label="You Might Also like"
          icon={<HiArrowLongRight />}
          heading={""}
          cardsData={recommendedSection}
        />
      </div>
    </>
  );
}

export default Post;
