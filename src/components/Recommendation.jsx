"use client";
import Link from "next/link";
import Card from "./Card";


function Recommendation({label, icon, heading, cardsData}) {
  
  return (
    <>
      <div className="mb-10 lg:mx-0 mx-5 lg:mt-10 mt-0">
        <div className="space-y-3 py-7">

        <h1 className="lg:text-6xl md:text-5xl text-2xl text-black dark:text-white font-bold flex items-center gap-5">{label}  {icon}</h1>
        <h2 className="lg:text-xl text-base italic font-[350]">
            {heading}
        </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3px]">
          {cardsData.map((item, index) => (
            <Link href={`/blog/${item._id}`} key={index}>
            <Card
              key={index}
              image={item.imagePost}
              category={item.category}
              title={item.postHeading}
              date={item.createdAt}
            />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Recommendation;
