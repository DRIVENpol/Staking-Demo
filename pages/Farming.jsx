import React, { useEffect, useState } from 'react'


import { Text, Center, Container } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

import { ethers } from "ethers";


import FarmingBox from '../components/FarmingBox';
import AnalyticsFarming from '../components/AnalyticsFarming';

const Farming = () => {

  const mainScAddress = "0x5F787db64B1313B981579A02673559f292f552DB";

  const tokenPrice = 2.47;

  const [poolDetails, setPollDetails] = useState({
    lockedTokens: 0,
    activeFarmers: 0,
    givenRewards: 0,
    owner: ''
   });

   const getPoolDetails = async () => {
    const iProvider = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/qSQowMkVnht5prnNyhu9DF8w-oBdrcww");

    const abi = ["function getOwner() public view returns(address)",
    "function getActiveStakers() public view returns(uint256)",
    "function getTotalTokensStaked() public view returns(uint256)",
    "function getTotalGivenRewards() public view returns(uint256)"
    ];

    const connectedContract = new ethers.Contract(mainScAddress, abi, iProvider);

    let _owner = await connectedContract.getOwner();
    let _stakers = await connectedContract.getActiveStakers();
    let _stakedTokens = await connectedContract.getTotalTokensStaked();
    let _givenRewards = await connectedContract.getTotalGivenRewards();

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
      <FarmingBox />
      </Center>

    </Container>
    </>
  )
}

export default Farming