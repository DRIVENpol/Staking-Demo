import React from "react"
import {
  Container,
Text
} from '@chakra-ui/react';
import ProjectDetails from "../components/ProjectDetails";
import Staking from "../components/Staking";
import Farming from "../components/Farming";

export default function Home() {
  return (
    <>
      <ProjectDetails />
      <Staking />
      <Farming />
    </>
  )
}
