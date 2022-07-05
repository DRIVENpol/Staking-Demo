import React from 'react'

import { Text, Center, Container } from '@chakra-ui/react';


import StakingBox from '../components/StakingBox';
import AnalyticsFarming from '../components/AnalyticsFarming';

const Farming = () => {

  return (
    <>
    <Container maxW={'100%'}>
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

export default Farming