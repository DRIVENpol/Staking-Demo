import React from "react"
import {
  Container, Text
} from '@chakra-ui/react';
import ProjectDetails from "../components/ProjectDetails";
import Staking from "../components/Staking";
import Farming from "../components/Farming";
import LatestNews from "../components/LatestNews";

export default function Home() {
  return (
    <>
      <ProjectDetails />
      <LatestNews />
      <Staking />
      <Farming />
    </>
  )
}
