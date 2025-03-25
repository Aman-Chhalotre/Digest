"use client";
import Category from "@/components/Category"
import { useContext, useEffect, useState } from "react";
import PostContext from "@/context/postContext";


function Marketing() {


  const {marketingPosts, handleShowMore} = useContext(PostContext);



  const recommendeddata = {
    id: marketingPosts[0]?._id,
    image: marketingPosts[0]?.imagePost,
    category: marketingPosts[0]?.category,
    author : marketingPosts[0]?.createdBy,
    title: marketingPosts[0]?.postHeading,
    date: "January 31, 2024",
  }


  return (
    <>
      <Category
      category = "Marketing"
      para = "Explore in-depth articles that unravel the latest marketing campaigns, dissecting the strategies employed by industry giants to captivate audiences and establish brand resonance. The multifaceted world of promotional endeavors."
      recommendeddata={recommendeddata}
      mustReaddata={marketingPosts}
      handleShowMore={handleShowMore}
      />
    </>
  )
}

export default Marketing