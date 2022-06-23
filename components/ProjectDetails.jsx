import React from 'react'

import { Image, Text, SimpleGrid, Box, Center, VStack, HStack } from '@chakra-ui/react';

import Twitter from '../assets/icons/twitter.png'
import Discord from '../assets/icons/discord.png'
import Website from '../assets/icons/click.png'


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
               <Center>
                <VStack mt={20} gap='5'>
                <Text align='center' fontSize={40} color='white'><b>About us...</b></Text>
                    <Text mb='10' maxW={'50%'} noOfLines={4} color='white' align='center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            <Box bgColor={"#FF0080"} px='6' py='2' borderRadius='40'>
                <HStack >
                    <Text color='white'>Follow us on Social Media:</Text>
                        <HStack>
                            <a href='#' target='_blank'><Image src={Twitter.src} alt='Twitter' w={5}/></a>
                            <a href='#' target='_blank'><Image src={Discord.src} alt='Discord' w={5}/></a>
                            <a href='#' target='_blank'><Image src={Website.src} alt='Website' w={5}/></a>
                        </HStack>
                        
                 </HStack>
                 </Box>
                 </VStack>
                </Center> 
           
    </>
  )
}

export default ProjectDetails