import React, { useEffect, useState } from 'react'


import { Text, Center, Container } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

import { ethers } from "ethers";


import FarmingBox from '../components/FarmingBox';
import AnalyticsFarming from '../components/AnalyticsFarming';

const Farming = () => {

  const mainScAddress = "0x3ED3A0201b96783e2923C523be2469896CB42772";

  const tokenPrice = 2.476;

  const [poolDetails, setPollDetails] = useState({
    lockedTokens: 0,
    activeFarmers: 0,
    givenRewards: 0,
    owner: ''
   });

   const getPoolDetails = async () => {
    const iProvider = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/qSQowMkVnht5prnNyhu9DF8w-oBdrcww");

    const abi = [
      "function getActiveStakers() external view returns(uint256)",
      "function getSmartContractOwner() external view returns(address)",
      "function getTotalStakedTokens() external view returns(uint256)",
      "function getTotalRedistributedRewards() external view returns(uint256)"
    ];

    const connectedContract = new ethers.Contract(mainScAddress, abi, iProvider);

    let _owner = await connectedContract.getSmartContractOwner();
    let _stakers = await connectedContract.getActiveStakers();
    let _stakedTokens = await connectedContract.getTotalStakedTokens();
    let _givenRewards = await connectedContract.getTotalRedistributedRewards();

    let _tvlConverted = Number(_stakedTokens);
    let _tvlWithoutDecimals = _tvlConverted / 10 ** 18;

    let _givenRConverted = Number(_givenRewards);
    let _givenRWithoutDecimals = _givenRConverted / 10 ** 18;

    setPollDetails({
      lockedTokens: (_tvlWithoutDecimals * tokenPrice).toLocaleString(),
      activeFarmers: Number(_stakers),
      givenRewards: _givenRWithoutDecimals.toLocaleString(),
      owner: _owner
      })

      // Logs
      console.log("======= PROJECT DETAILS ========");
      console.log("Owner: " + _owner);
      console.log("Locked Tokens: " + _stakedTokens / 10 ** 18);
      console.log("Stakers: " + _stakers);
      console.log("Rewards: " + _givenRewards);
      console.log("===============");
};

useEffect(() => {
  getPoolDetails();
}, [])




  return (
    <>
    <Container maxW={'100%'} pt='10'>
    <Center>
      <Text as='b' pb='20' color='white' fontSize={'4xl'} align='center'>
        Farm DVX-BNB LP and get DVX rewards
      </Text>
    </Center>

   <AnalyticsFarming 
    stakers = {poolDetails.activeFarmers}
    lockedTokens = {poolDetails.lockedTokens}
    givenRewards = {poolDetails.givenRewards}
    owner = {poolDetails.owner}
   />

      <Center>
      <FarmingBox poolDetails={getPoolDetails} />
      </Center>

    </Container>
    </>
  )
}

export default Farming