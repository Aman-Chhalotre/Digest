"use client";
import Recommendation from "@/components/Recommendation";
import card1 from "@/assets/card1.webp";
import card2 from "@/assets/card2.jpg";
import card3 from "@/assets/card3.jpg";
import card4 from "@/assets/card4.webp";
import { useContext } from "react";
import PostContext from "@/context/postContext";

function Analysis() {
  const { marketTrendsPosts, startupsPosts, marketingPosts, handleShowMore } =
    useContext(PostContext);

  const mustReaddata = [
    ...marketTrendsPosts,
    ...startupsPosts,
    ...marketingPosts
  ];

  return (
    <>
      <Recommendation
        label="Tag: Analysis"
        icon={""}
        heading={""}
        cardsData={mustReaddata}
        handleShowMore={handleShowMore}
      />
      <div className="mt-5 w-full flex items-center justify-center">
        <button
          className="text-black hover:text-white text-xs font-bold bg-lime hover:bg-[#6DBA16] duration-200 py-2 lg:px-9 md:px-7 px-6"
          onClick={() => handleShowMore()}
        >
          Show More
        </button>
      </div>
    </>
  );
}

export default Analysis;
