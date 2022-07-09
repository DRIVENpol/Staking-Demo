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
    ModalCloseButton, useDisclosure, InputLeftAddon, InputGroup } from '@chakra-ui/react';
  

const FarmingAddButton = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  

  const mainScAddress = "0x5F787db64B1313B981579A02673559f292f552DB";
  const stakeTokenAddress = "0xc0F72E77F46db4C8a5787BAa8B6f8C0ee7aBA3F6";

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

  // ======= APPROVE  =======
  const [ercApprove, setErcApprove] = useState(0);

  const allowanceErc20 = async () => {
    if (typeof window !== 'undefined'){
      try {
        
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        // const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const abi = [
        "function allowance(address owner, address spender) public view returns (uint256)",
        "function decimals() public view returns (uint8)"];

        const connectedContract = new ethers.Contract(stakeTokenAddress, abi, provider);

        let _decimals = await connectedContract.decimals();
        
        let _isApproved = await connectedContract.allowance(account, mainScAddress);

        let fAmount = _isApproved / 10 ** _decimals;

        console.log("==== APPROVED: " + fAmount + " ====");
        setErcApprove(fAmount);

        // console.log("==== ERC20 APPROVE: " + _isApproved + " ====");


        // setIsLoading(true);
        // await _createERC20.wait();
        // setIsLoading(false);
        // manipulateNotif();


        // console.log(_createERC20);
        // console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${_createERC20.hash}`);
        // setTransaction(`https://rinkeby.etherscan.io/tx/${_createERC20.hash}`);


      } catch (error) {
        
      }
    }
  };

  useEffect(() => {
    // console.log("==== APPROVED: " + ercApprove + " ====");
  }, [])
  

  const [tAmount, setTAmount] = useState(0);

  const approveErc20 = async () => {
    if (typeof window !== 'undefined'){
      try {
        
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const abi = ["function approve(address spender, uint256 amount) public returns (bool)",
        "function balanceOf(address account) public view returns (uint256)"];
        
        const connectedContract = new ethers.Contract(stakeTokenAddress, abi, signer);

        let _userBalance = await connectedContract.balanceOf(account);

        let _isApproved = await connectedContract.approve(mainScAddress, _userBalance, {gasLimit:6000000});
        

        // setIsLoadingApprove(true);
        await _isApproved.wait();
        // setIsLoadingApprove(false);
        allowanceErc20();
        // manipulateNotif();


        console.log(_isApproved);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${_isApproved.hash}`);
        setTransaction(`https://rinkeby.etherscan.io/tx/${_isApproved.hash}`);


      } catch (error) {
        
      }
    }
  };


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
     <Button position={'absolute'} float='right' right={['27%', '20%', '15%', '52%', '51%']}
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
          <ModalHeader>Farm DVX-BNB LP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP in your wallet:</b> userBalance</Text>
            </Box>

            <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP farmed:</b> 23,456</Text>
            </Box>
            <br />
            <InputGroup>
              <InputLeftAddon bgColor={'#15234a'}>DVX-BNB LP</InputLeftAddon>
              <Input type='number' placeholder='Amount To Farm'
              onChange={(event) => {
                setTAmount(event.target.value);
                }} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>

         
          <Button
              onClick={approveErc20}
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={20}>
            Farm
            </Button>
           

            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default FarmingAddButton