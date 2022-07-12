import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack, Text,
  useDisclosure
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';



const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const Link = ({ children, href }) => {
        const router = useRouter();
            return (
                <a
                href="#"
                onClick={(e) => {
                e.preventDefault()
                router.push(href)
                }}
            >
            {children}
        </a>
        )
    }


  return (
    <><Flex>
      <Box bgGradient='linear(to-r, #141E30, #243B55)' px={4} width='100%'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} color='white' >
        <IconButton
            size={'sm'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            color='black'
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box ml={10}><Link href='/'><Text fontSize='2xl'><b>Staking Demo</b></Text></Link></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>

                        <Link href="/Staking"><Button _hover={{background: "#243B55", color: "white"}} bgColor='transparent'>
                        Stake $DVX
                        </Button></Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'} mr={20}>

         <Button
              variant={'solid'}
              size='sm'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['75%', null, '100%', '100%', '100%']}
              ml="30px"
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
              display={{ base: 'none', md: 'flex' }} px={6} borderRadius={20}>
             Official Website
            </Button>

          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <Button colorScheme='blackAlpha'><Link href="/">Home</Link></Button>
            <Button colorScheme='blackAlpha'><Link href="/Farming">Stake $DVX</Link></Button>
            
            <Button width={'100%'} bgGradient='linear(to-l, #7928CA, #FF0080)' color={'white'} _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}>
           Official Website
            </Button>
            </Stack>
          </Box>
        ) : null}
      </Box></Flex>
    </>
  );
}

export default Navbar