import React from 'react'

import { Container, Text, SimpleGrid, Box, Center, VStack } from '@chakra-ui/react';

const ProjectDetails = () => {
  return (
    <>
            <SimpleGrid columns={['1', '1', '1', '2', '2']} spacing={10} color='white'>
                <Box py={5}>
                <br /><Text align={['center', 'center', 'center', 'right', 'right']} fontSize='3xl' mr={[null, null, null, null, '20']}><b>Welcome to Staking Demo!</b></Text>
                    <Text align={['center', 'center', 'center', 'right', 'right']} mr={[null, null, null, null, '20']}>The best place to get a staking dapp for your project!</Text></Box>
                    <Box color={'#243B55'}
                    width={['100%', '100%', '50%', '50', '50%']} 
                    height={'150'} 
                    border='1px' 
                    borderRadius='20' 
                    borderColor={'#FF0080'} 
                    boxShadow='#FF0080 0px 2px 15px'
                    >
                    <VStack my={7}>
                        <Text color="#FF0080" mb='-3' fontSize={'3xl'}><b>TVL</b></Text>
                        <Text color='white' fontSize={'3xl'} textShadow='#FF0080 0px 2px 15px'><b>$1,200,000</b></Text>
                        </VStack>
                    </Box>
            </SimpleGrid>
           
    </>
  )
}

export default ProjectDetails