import React from "react"
import {
  Container, Text
} from '@chakra-ui/react';
import ProjectDetails from "../components/ProjectDetails";
import LatestNews from "../components/LatestNews";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectDetails />
      <LatestNews />
      {/* <Staking />
      <Farming /> */}
    </>
  )
}
