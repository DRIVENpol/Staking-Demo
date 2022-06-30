import React from "react"
import {
  Container, Text
} from '@chakra-ui/react';
import ProjectDetails from "../components/ProjectDetails";
import LatestNews from "../components/LatestNews";

export default function Home() {
  return (
    <>
      <ProjectDetails />
      <LatestNews />
      {/* <Staking />
      <Farming /> */}
    </>
  )
}
