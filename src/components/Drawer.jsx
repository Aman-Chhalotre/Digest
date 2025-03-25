"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { TbMenuDeep } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useContext, useState } from "react";
import "@/css/Drawer.css";
import {
  FaInstagram,
  FaLinkedin,
  FaRegArrowAltCircleRight,
  FaSearch,
} from "react-icons/fa";
import Link from "next/link";
import SectionsCard from "./SectionsCard.jsx";
import { HiArrowLongRight } from "react-icons/hi2";
import PostContext from "@/context/postContext.js";
import { useRouter } from "next/navigation.js";

export default function MenuDrawer({ toggleDrawer, open }) {
  const { trendingSection } = useContext(PostContext);
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    router.push("/search");
    toggleDrawer(false);
    // Prevent the default form submission
    // router.push(`/search?query=${query}`); // Navigate to "/search" with the query parameter
  };

  // const handleIconClick = () => {
  //   if (query.trim()) {
  //     router.push(`/search?query=${query}`); // Navigate on button click
  //   }
  // };

  const DrawerList = (
    <div className="h-full w-[100%]">
      <Box>
        <div className="space-y-10 p-6">
          <div className="space-y-2">
            <div className="w-full flex items-center justify-end">
              <RxCross2
                className="text-4xl text-white"
                onClick={toggleDrawer(false)}
              />
            </div>
            <h1 className="text-white">Search</h1>
            <div className="w-full flex items-center p-2 gap-2 border-[0.5px] border-gray-600">
              <FaSearch className="text-gray-400 text-lg font-semibold" />
              <form
                className="w-full"
                onSubmit={(e) => {
                  handleFormSubmit(e);
                }}
              >
                <input
                  type="text"
                  onChange={(e) => setQuery(e.target.value)} // Update query state
                  placeholder="Search Headlines, News..."
                  className="w-full bg-transparent placeholder:text-sm placeholder:text-gray-300 outline-none text-white "
                />
              </form>
              <FaRegArrowAltCircleRight
                className="text-white hover:text-lime duration-100"
                // onClick={handleIconClick}
              />
            </div>
          </div>
          <div className="text-gray-200 space-y-2">
            <h1 className="text-sm font-bold">Pages</h1>
            <div className="w-full border-t-[1px] border-gray-700 grid grid-cols-2 gap-4 pt-5 font-bold">
              <div>
                <Link href={"/"} onClick={toggleDrawer(false)}>
                  Home
                </Link>
              </div>
              <div>
                <Link href={"/contactUs"} onClick={toggleDrawer(false)}>
                  Contact Us
                </Link>
              </div>
              <div>
                <Link href={"/blog"} onClick={toggleDrawer(false)}>
                  Blog Index
                </Link>
              </div>
              <div>
                <Link href={"/SearchComponent"} onClick={toggleDrawer(false)}>
                  Search Page
                </Link>
              </div>
            </div>
          </div>
          <div className="text-gray-200 space-y-2">
            <h1 className="text-sm font-bold">Categories</h1>
            <div className="w-full border-t-[1px] border-gray-700 grid grid-cols-2 gap-4 pt-5 font-bold">
              <div>
                <Link
                  href={"/category/marketing"}
                  onClick={toggleDrawer(false)}
                >
                  Marketing
                </Link>
              </div>
              <div>
                <Link href={"/category/startups"} onClick={toggleDrawer(false)}>
                  Startups
                </Link>
              </div>
              <div>
                <Link
                  href={"/category/advertising"}
                  onClick={toggleDrawer(false)}
                >
                  Advertising
                </Link>
              </div>
              <div>
                <Link
                  href={"/category/market-trends"}
                  onClick={toggleDrawer(false)}
                >
                  Market Trends
                </Link>
              </div>
              <div>
                <Link href={"/"} onClick={toggleDrawer(false)}>
                  Tech Moves
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-black text-white text-[10%]">
          <SectionsCard
            Items={trendingSection}
            section="Trending"
            icon={<HiArrowLongRight className="text-4xl" />}
            withImage={false}
            imageFirst={false}
            drawer={true}
            toggleDrawer={toggleDrawer(false)}
          />
        </div>
        <div className="flex items-center justify-between p-6">
          <h1 className="text-gray-200 text-xl font-bold">Follow Us</h1>
          <div className="flex items-center gap-5">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white text-[25px] duration-200" />
            </a>
            <a
              href="https://www.instagram.com/startupdigest.in/profilecard/?igsh=MTd0eWdlNHZyN2I5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white text-[25px] duration-200" />
            </a>
          </div>
        </div>
      </Box>
    </div>
  );

  return (
    <div className="lg:hidden block">
      {!open ? (
        <TbMenuDeep
          className="text-3xl text-[#666] dark:text-white ms-2 mt-1 lg:hidden block"
          onClick={toggleDrawer(true)}
        />
      ) : (
        <RxCross2
          className="text-3xl text-[#666] dark:text-white ms-2 mt-1 lg:hidden block"
          onClick={toggleDrawer(false)}
        />
      )}
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ backgroundColor: "transparent", marginTop: "2.5rem" }}
      >
        <div id="drawer" className="h-full overflow-y-scroll w-[100vw]">
          {DrawerList}
        </div>
      </Drawer>
    </div>
  );
}
