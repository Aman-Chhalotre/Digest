"use client";
import Category from "@/components/Category"
import { useContext, useEffect, useState } from "react";
import PostContext from "@/context/postContext";


function TechMoves() {

  const {techMovesPosts, handleShowMore} = useContext(PostContext);


  const recommendeddata = {
    id: techMovesPosts[0]?._id,
    image: techMovesPosts[0]?.imagePost,
    category: techMovesPosts[0]?.category,
    author : techMovesPosts[0]?.createdBy,
    title: techMovesPosts[0]?.postHeading,
    date: "January 31, 2024",
  }


  return (
    <>
      <Category
      category = "Tech Moves"
      para = "Explore in-depth articles that unravel the latest marketing campaigns, dissecting the strategies employed by industry giants to captivate audiences and establish brand resonance. The multifaceted world of promotional endeavors."
      recommendeddata={recommendeddata}
      mustReaddata={techMovesPosts}
      handleShowMore={handleShowMore}
      />
    </>
  )
}

export default TechMoves