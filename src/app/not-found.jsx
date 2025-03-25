"use client";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]  px-6">
      <div className="text-center flex flex-col items-center">
        {/* Illustration */}
        <div className="text-green-500 sm:text-[135px] text-7xl font-bold mb-2">404</div>
        <p className="sm:text-5xl text-lg font-bold text-gray-800 dark:text-white mb-4">
          Something's wrong here…
        </p>
        <p className="text-gray-700 dark:text-white mb-6 sm:text-lg text-sm">
          It looks like nothing was found at this location. The page you were
          looking for does not exist or was loading incorrectly.
        </p>

        {/* Search Box */}
        <div className="sm:w-[490px] xs:w-[350px] w-[280px] py-3 xs:px-2 px-1 flex items-center justify-between mb-6 bg-gray-100">
            <div className="flex items-center">

          <FaSearch />
          <input
            type="text"
            placeholder="Search Headlines, News…"
            className="px-2 sm:w-52 outline-none bg-transparent xs:text-base text-sm placeholder:text-gray-500"
            />
            </div>
          <div>

          <span className="text-xl text-[#67883E]">|</span>
          <button className=" text-gray-600 text-sm font-bold px-4 py-2 rounded-r-lg ">
            Search
          </button>
          </div>
        </div>

        {/* Button to Homepage */}
        <Link
          href={"/"}
          className="w-fit bg-gray-100 text-black text-sm hover:text-white font-bold px-6 py-2 hover:bg-[#6DBA16] duration-200"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
