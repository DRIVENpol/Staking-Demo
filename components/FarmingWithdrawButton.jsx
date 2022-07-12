import React, { useState, useEffect } from 'react'

import { networkParams } from "../Utils/Networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../Utils/providerOptions";

import { Input, Button, Text, Box, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, InputLeftAddon, InputGroup,
    useToast, 
    Grid, GridItem} from '@chakra-ui/react';
  

const FarmingWithdrawButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const toast = useToast();

  const mainScAddress = "0x45f82E937D45cF131C441F1C4206B8b13686284f";


      // Wallet Connect
      const [provider, setProvider] = useState();
      const [library, setLibrary] = useState();
      const [account, setAccount] = useState();
      const [signature, setSignature] = useState("");
      const [isError, setError] = useState("");
      const [isErrorErc, setErrorErc] = useState("");
      const [isErrorNft, setErrorNft] = useState("");
      const [isErrorLock, setErrorLock] = useState("");
      const [chainId, setChainId] = useState();
      const [network, setNetwork] = useState();
      const [message, setMessage] = useState("");
      const [signedMessage, setSignedMessage] = useState("");
      const [verified, setVerified] = useState();

      const [tAmount, setTAmount] = useState(0);


  const OverlayTwo = () => (
        <ModalOverlay
          // bg='black'
          // opacity=''
          backdropFilter='auto'
          // backdropInvert='10%'
          backdropBlur='5px'
        />
      )

  const [overlay, setOverlay] = React.useState(<OverlayTwo />)

  const [unfarmLoading, setUnfarmLoading] = useState(false);

  // ======= WITHDRAW AMOUNT  =======
  const unFarming = async () => {
    if (typeof window !== 'undefined'){
      try {
        
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const account = await signer.getAddress();

        setProvider(provider);
        setLibrary(library);

        
        const abi = ["function withdraw(uint256 _amount) external"];
        const connectedContract = new ethers.Contract(mainScAddress, abi, signer);

        //TODO: decimals!
        // tAmount = 5;
        const tAmountBN = ethers.BigNumber.from( tAmount.toString() )
          .mul(
            ethers.BigNumber.from( '10' )
              .pow( ethers.BigNumber.from( '18' ))
          );

        console.info({ tAmountBN: tAmountBN.toString() });
        const gasLimit = await connectedContract.estimateGas.withdraw( tAmountBN.toString(), { from: account });
        let _unfarming = await connectedContract.withdraw( tAmountBN.toString(), { from: account, gasLimit: gasLimit.toString() });

        setUnfarmLoading(true);
        await _unfarming.wait();
        setUnfarmLoading(false);
        props.ui();
        props.poolDetails();
        onClose();
        toast({
          title: 'Congrats!',
          description: `You withdrawn ${tAmount} DVX.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        console.log(_farming);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${_farming.hash}`);
        //setTransaction(`https://rinkeby.etherscan.io/tx/${_farming.hash}`);
      } catch (err) {
console.warn({ err });
        if( err?.error?.data?.message ){
          window.alert( err.error.data.message );
        }
      }
    }
  };


  const [wrLoading, setWrLoading] = useState(false);

  // ======= WITHDRAW REWARDS  =======
  const withdrawRewards = async () => {
    if (typeof window !== 'undefined'){
      try {
        
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const account = await signer.getAddress();

        setProvider(provider);
        setLibrary(library);

        
        const abi = ["function withdraw(uint256 _amount) external"];
        const connectedContract = new ethers.Contract(mainScAddress, abi, signer);

  
        const gasLimit = await connectedContract.estimateGas.withdraw( 0, { from: account });
        let _unfarming = await connectedContract.withdraw( 0, { from: account, gasLimit: gasLimit.toString() });

        setWrLoading(true);
        await _unfarming.wait();
        setWrLoading(false);
        props.ui();
        props.poolDetails();
        onClose();
        toast({
          title: 'Congrats!',
          description: `You withdrawn your rewards (${props.pr} DVX).`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        console.log(_farming);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${_farming.hash}`);
        //setTransaction(`https://rinkeby.etherscan.io/tx/${_farming.hash}`);
      } catch (err) {
console.warn({ err });
        if( err?.error?.data?.message ){
          window.alert( err.error.data.message );
        }
      }
    }
  };



const MINUTE_MS = 6000;

useEffect(() => {
  const interval = setInterval(() => {
    props.ui();
    props.poolDetails();
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])



  useEffect(() => {
    // props.allowanceFunction();
    props.ui();
  }, [])
  

  // ======= CONNECTION  =======
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
   <>
     <Button position={'absolute'} float='right' right={['27%', '20%', '15%', '13%', '9.5%']}
                        size='xs'
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        color='white'
                        maxW={'20%'}
                        fontSize={['12px', null, null, null, '100%']}
                        _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
                        px={15} borderRadius={40}
                        onClick={() => {
                          setOverlay(<OverlayTwo />)
                          onOpen()
                        }}>
                      <b>+</b>
                      </Button>

                      <Modal isCentered isOpen={isOpen} onClose={onClose} size='2xl' 
                      >
        {overlay}
        <ModalContent bgColor='#0d1836' color={'white'} border='2px' borderColor={'#FF0080'} p='6' borderRadius={20}>
          <ModalHeader>Stake DVX</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX in your wallet:</b> {props.ub}</Text>
            </Box>

            <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX farmed by you:</b> {props.sbu}</Text>
            </Box>

            <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>Pending Rewards:</b> {props.pr}</Text>
            </Box>
            <br />
            <InputGroup>
              <InputLeftAddon bgColor={'#15234a'}>DVX</InputLeftAddon>
              <Input type='number' placeholder='Amount To Withdraw'
              onChange={(evt) => {
                if( evt.target.value && !isNaN( evt.target.value ) ){
                console.info( `setting ${evt.target.value}` );
                  setTAmount(parseFloat( evt.target.value ));
                }
              }} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>

          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', ]} gap={1} align='right'>
              <GridItem w='100%' >
              {unfarmLoading === false ? (
                <>
                <Button
              onClick={unFarming}
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={20} mb={['2', '2', null, null, null]}>
             Withdraw Tokens
            </Button>
                </>
              ) : (<>
                <Button
              isLoading
              loadingText='Withdrawing...'
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={20} mb={['2', '2', null, null, null]}
               />
              </>)}
             

              </GridItem>


              <GridItem w='100%'>
              {wrLoading === false ? (<>
                <Button
              onClick={withdrawRewards}
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={20}>
             Withdraw Rewards
            </Button>
              </>) : (<>
                <Button
              isLoading
              loadingText='Withdrawing...'
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={20} mb={['2', '2', null, null, null]}
               />
              </>)}
             
              </GridItem>
          </Grid>


            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default FarmingWithdrawButton