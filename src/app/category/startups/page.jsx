"use client";
import Category from "@/components/Category"
import { useContext, useEffect, useState } from "react";
import PostContext from "@/context/postContext";


function Startups() {


  const {startupsPosts, handleShowMore} = useContext(PostContext);


  const recommendeddata = {
    id : startupsPosts[0]?._id,
    image: startupsPosts[0]?.imagePost,
    category: startupsPosts[0]?.category,
    author : startupsPosts[0]?.createdBy,
    title: startupsPosts[0]?.postHeading,
    date: "January 31, 2024",
  }


  return (
    <>
      <Category
      category = "Startups"
      para = "Join us in celebrating the spirit of innovation and creativity within the startup world. Explore our Startups category to witness the birth of ideas, the evolution of businesses, the collective journey of those daring enough."
      recommendeddata={recommendeddata}
      mustReaddata={startupsPosts}
      handleShowMore={handleShowMore}
      />
    </>
  )
}

export default Startups