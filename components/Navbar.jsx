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

import { networkParams } from "../Utils/Networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../Utils/providerOptions";



const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [signature, setSignature] = useState("");
    const [isError, setError] = useState("");
    const [chainId, setChainId] = useState();
    const [network, setNetwork] = useState();
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();

    const Link = ({ children, href }) => {
        const router = useRouter();
            return (
                <a
                href="#"
                onClick={(e) => {
                e.preventDefault()
                // typically you want to use `next/link` for this usecase
                // but this example shows how you can also access the router
                // and use it manually
                router.push(href)
                }}
            >
            {children}
        </a>
        )
    }

    const connectWallet = async () => {
        if (typeof window !== 'undefined'){
        try {
            const web3Modal = new Web3Modal({
            cacheProvider: true, // optional
            providerOptions // required
            });
  
        
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        setProvider(provider);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setChainId(network.chainId);
  
  
      } catch (error) {
        setError(error);
      }
    }
   
  };
  
  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };
  
  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };
  
  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };
  
  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };
  
  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };
  
  const refreshState = () => {
      
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
   
  };
  
  const disconnect = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });
    await web3Modal.clearCachedProvider();
    refreshState();
  };
  
  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });
    if (web3Modal.cachedProvider) {
      connectWallet();
     
    }
  }, []);
  
  useEffect(() => {
      
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };
  
      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };
  
      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };
  
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);
  
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
  
  useEffect(() => {
    if (window.ethereum){
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    } else {
      setProvider(providerOptions.walletconnect)
    }
  }, []);


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

                        <Link href="/Farming"><Button _hover={{background: "#243B55", color: "white"}} bgColor='transparent'>
                        Farm $DVX
                        </Button></Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'} mr={20}>

         <Button onClick={disconnect}
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
            <Button colorScheme='blackAlpha'><Link href="/Staking">Stake $DVX</Link></Button>
            <Button colorScheme='blackAlpha'><Link href="/Farming">Farm $DVX</Link></Button>
            
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