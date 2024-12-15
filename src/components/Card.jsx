"use client";
import Image from "next/image";
import "../css/swiperbg.css";
import Link from "next/link";
import card1 from "@/assets/card1.webp";
import LoadingAnimation from "./Loading";

const Card = ({ image, category, title, date }) => {
  return (
    <div className="bg-[#04031D] text-white overflow-hidden shadow-md h-full w-full cursor-pointer">
      {/* Image Section */}
      <div className="w-full h-[320px] relative">
        {!image ? (
          <LoadingAnimation />
        ) : (
          <Image
            onError={(e) => console.error(e.target.id)}
            src={`${image}` || `/${card1}`} // Dynamic image path
            alt={title} // Alt text
            layout="fill" // Makes the image fill the container
            objectFit="fill" // Ensures the image covers the area without distortion
            className="object-cover"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-5  relative">
        {/* Category Tag */}
        <Link
          href={`/category/${category.toLowerCase().replace(/[-\s]+/g, "")}`}
          className="absolute top-[-21px] inline-block bg-[#C2FF74] hover:bg-[#04031D] text-[#010328] hover:text-white  duration-150 text-[9px] tracking-[1px] font-bold px-2 py-1 uppercase"
        >
          {category}
        </Link>

        {/* Title */}
        <h2 className="p sm:text-[28px] text-[18px] leading-tight font-[700] hover:text-black duration-200">
          {title}
        </h2>

        {/* Date */}
        <p className="text-[13px] mt-2">{date}</p>
      </div>
    </div>
  );
};

export default Card;
