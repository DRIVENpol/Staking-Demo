import React, { useEffect } from 'react'


import { Text, Center, Container } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

import StakingBox from '../components/StakingBox';
import AnalyticsFarming from '../components/AnalyticsFarming';

const Staking = () => {

  return (
    <>
    <Container maxW={'100%'} pt='10'>
    <Center>
      <Text as='b' pb='20' color='white' fontSize={'4xl'} align='center'>
        Farm DVX-BNB LP and get DVX rewards
      </Text>
    </Center>

   <AnalyticsFarming />

      <Center>
      <StakingBox />
      </Center>

    </Container>
    </>
  )
}

export default Staking