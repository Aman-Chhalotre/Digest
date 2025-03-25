"use client";
import Image from "next/image";
import React from "react";

function Developer() {
  return (
    <>
      <div className="min-h-[80vh] text-center">
        <h1 className="text-3xl mt-10 font-bold text-gray-600 dark:text-gray-300">
          Developers
        </h1>
        <div className="flex md:flex-row flex-col items-center justify-center md:gap-10">
          <section className=" text-white py-10 px-6 flex flex-col  items-center md:items-start justify-center md:justify-start space-y-6 md:space-y-0 md:space-x-10">
            {/* Left: Image */}
            <div className="relative w-40 h-40 md:w-64 md:h-64">
              <div className="absolute inset-0 border-4 border-blue-400 rounded-lg transform translate-x-4 translate-y-4"></div>
              {/* <Image
              onError={(e) => console.error(e.target.id)}
                src={""} // Replace with the actual image path
                alt="Profile Picture"
                className="rounded-lg"
                fill
                objectFit="cover"
              /> */}
            </div>

            {/* Right: Content */}
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-gray-700 dark:text-gray-300 text-xl font-semibold mt-5">
                Aman Chhalotre
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Frontend Developer
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <a
                  href="https://www.linkedin.com/in/aman-chhalotre-00873b249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
                  target="blank"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </section>
          <section className=" text-white py-10 px-6 flex flex-col  items-center md:items-start justify-center md:justify-start space-y-6 md:space-y-0 md:space-x-10">
            {/* Left: Image */}
            <div className="relative w-40 h-40 md:w-64 md:h-64">
              <div className="absolute inset-0 border-4 border-blue-400 rounded-lg transform translate-x-4 translate-y-4"></div>
              {/* <Image
              onError={(e) => console.error(e.target.id)}
                src={""} // Replace with the actual image path
                alt="Profile Picture"
                className="rounded-lg"
                fill
                objectFit="cover"
              /> */}
            </div>

            {/* Right: Content */}
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-gray-700 dark:text-gray-300 text-xl font-semibold mt-5">
                Abhishek Chhapre
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Backend Developer
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <a
                  href="https://www.linkedin.com/in/abhishek-chhapre-662387201/"
                  target="blank"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Developer;
