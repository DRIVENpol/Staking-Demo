import React from 'react'

import { Text, Grid, GridItem, Box, VStack } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

import Background from '../assets/bg-tabs.png';


const AnalyticsFarming = (props) => {
  return (
    <>
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', ]} 
    align='center' pb='10' gridRowGap={10}
    >

      <GridItem align={'center'}>
      <motion.div whileHover={{
    scale: 1.05,
    transition: { duration: .3 },
  }}>
      <Box color={'#1b1545'} width='80%'    
                    height={'150'}
                    bgColor='#10044c'
                    border='1px' 
                    borderRadius='20'
                    bgImage={Background.src} bgPosition='center' bgSize={'100%'}
                    >
                    <VStack p={7}>
                        <Text color="#FF0080" mb='-2.5' fontSize={'1xl'}><b>APY Rate:</b></Text>
                        <Text color='white' fontSize={'4xl'}><b>34%</b></Text>
                        </VStack>
                    </Box></motion.div>
      </GridItem>


      <GridItem align='center'>
      <motion.div whileHover={{
    scale: 1.05,
    transition: { duration: .3 },
  }}>
      <Box color={'#1b1545'} width='80%'
                    height={'150'} 
                    border='1px' 
                    borderRadius='20' bgImage={Background.src} bgPosition='center' bgSize={'100%'}
                    >
                    <VStack p={7}>
                        <Text color="#FF0080" mb='-2.5' fontSize={'1xl'}><b>TVL:</b></Text>
                        <Text color='white' fontSize={'4xl'}><b>${props.lockedTokens}</b></Text>
                        </VStack>
                    </Box>
                    </motion.div>
      </GridItem>

      <GridItem align='center'>
      <motion.div whileHover={{
    scale: 1.05,
    transition: { duration: .3 },
  }}>
      <Box color={'#1b1545'} width='80%'    
                    height={'150'}
                    border='1px' 
                    borderRadius='20' 
                    bgImage={Background.src} bgPosition='center' bgSize={'100%'}
                    >
                    <VStack p={7}>
                        <Text color="#FF0080" mb='-2.5' fontSize={'1xl'}><b>Active Stakers:</b></Text>
                        <Text color='white' fontSize={'4xl'}><b>{props.stakers}</b></Text>
                        </VStack>
                    </Box>
                    </motion.div>
      </GridItem>


      <GridItem align='center'>
      <motion.div whileHover={{
    scale: 1.05,
    transition: { duration: .3 },
  }}>
      <Box color={'#1b1545'} width='80%'    
                    height={'150'}
                    border='1px' 
                    borderRadius='20' 
                    bgImage={Background.src} bgPosition='center' bgSize={'100%'}
                    >
                    <VStack p={7}>
                        <Text color="#FF0080" mb='-2.5' fontSize={'1xl'}><b>Given Rewards(DVX):</b></Text>
                        <Text color='white' fontSize={'4xl'}><b>{props.givenRewards}</b></Text>
                        </VStack>
                    </Box>
                    </motion.div>
      </GridItem>
    </Grid>

    </>
  )
}

export default AnalyticsFarming