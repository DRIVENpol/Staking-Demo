import React, { useState, useEffect } from 'react'
import { Text, Grid, GridItem, Box, HStack, Spinner, Center, Container, Button } from '@chakra-ui/react';

import FarmingAddButton from './FarmingAddButton';
import FarmingWithdrawButton from './FarmingWithdrawButton';

import { networkParams } from "../Utils/Networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../Utils/providerOptions";

const FarmingBox = () => {

  const mainScAddress = "0x5F787db64B1313B981579A02673559f292f552DB";
  const stakeTokenAddress = "0xe278058F6598F712095DA268367f267F9E250D4A";

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



  const [userBalance, setUserBalance] = useState('');

  const userInfo = async () => {
    const iProvider = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/qSQowMkVnht5prnNyhu9DF8w-oBdrcww");

        const abi = [
        "function balanceOf(address account) public view returns (uint256)",
        "function decimals() public view returns (uint8)"];

        const connectedContract = new ethers.Contract(stakeTokenAddress, abi, iProvider);
        let _decimals = await connectedContract.decimals();
        let _userBalance = await connectedContract.balanceOf(account);
        setUserBalance((_userBalance / 10 ** _decimals).toLocaleString());

        localStorage.setItem('userBalance', (_userBalance / 10 ** _decimals).toLocaleString());
  };

    // ======= APPROVE  =======
    const [ercApprove, setErcApprove] = useState(0);

    const allowanceErc20 = async () => {
      if (typeof window !== 'undefined'){
        try {
          
          const { ethereum } = window;
          const provider = new ethers.providers.Web3Provider(ethereum);
  
  
          setProvider(provider);
          setLibrary(library);
  
          const abi = [
          "function allowance(address owner, address spender) public view returns (uint256)",
          "function decimals() public view returns (uint8)"];
  
          const connectedContract = new ethers.Contract(stakeTokenAddress, abi, provider);
  
          let _decimals = await connectedContract.decimals();
          
          let _isApproved = await connectedContract.allowance(account, mainScAddress);
  
          let fAmount = _isApproved / 10 ** _decimals;
  
          setErcApprove(fAmount);
          localStorage.setItem('ercApprove', fAmount);

  
        } catch (error) {
          
        }
      }
    };

  
  async function connectWallet() {
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
      userInfo();
      allowanceErc20();
    } catch (error) {
      setError(error);
    }
  }
 
};

function handleNetwork(e) {
  const id = e.target.value;
  setNetwork(Number(id));
};

function handleInput(e) {
  const msg = e.target.value;
  setMessage(msg);
};

async function switchNetwork() {
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

async function signMessage() {
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

async function verifyMessage() {
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

function refreshState() {
    
  setAccount();
  setChainId();
  setNetwork("");
  setMessage("");
  setSignature("");
  setVerified(undefined);
 
};

async function disconnect() {
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
  userInfo();
  if (window.ethereum){
    setProvider(new ethers.providers.Web3Provider(window.ethereum))
  } else {
    setProvider(providerOptions.walletconnect)
  }
}, []);

  return (
    <>
        <Box color={'#1b1545'} width='90%' mb='20' p='10' mt='2'
                    height={'100%'}
                    border='1px' 
                    borderRadius='20' 
                    bgColor='#0d1836'
                    borderColor={'#FF0080'} 
                    boxShadow='#FF0080 0px 2px 15px'
                    
                    >

        {!account ? (
          <>
          <Container height={'200'} p='5'>
          <Center>
          <Spinner color='#FF0080' width={100} thickness='4px'
          speed='0.65s'
          emptyColor='#19284f'
          height='100' />
          </Center>

          <Center>
          <Button
              onClick={connectWallet}
              variant={'solid'}
              size='sm'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['75%', null, '100%', '100%', '100%']}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
              mt='10' px={6} borderRadius={20}>
             Connect Your Wallet
            </Button>
          </Center>
          </Container>
          </>
        ): (
          <>
          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']} gap={2}>
                   <GridItem w='100%'>
                        <Text as={'b'} color='white' fontSize={'xl'}>Account Analytics</Text>
                      </GridItem>

                      <GridItem />

                      <GridItem w='100%'>
                      <Box p='5' bgColor={'#132144'} borderRadius='12'>
                      <HStack>
                        <Text color='white'><b>Pending Rewards</b></Text>
                        <Text align='right' color='white' flex='1'>267,123 DVX</Text>
                        </HStack>
                        </Box>
                      </GridItem>


                      <GridItem w='100%'>
                      <Box p='5' bgColor={'#132144'} borderRadius='12'>
                      <HStack>
                        <Text color='white'><b>Amount In Wallet</b></Text>
                        <Text align='right' color='white' flex='1'>{localStorage.getItem('userBalance')} DVX</Text>
                        </HStack>
                        </Box>
                      </GridItem>


                      <GridItem w='100%'>
                      <Box p='5' bgColor={'#132144'} borderRadius='12'>
                      <HStack>
                        <Text color='white'><b>Staked Amount</b></Text>
                        <Text align='right' color='white' flex='1'>267,123 DVX</Text>
                        </HStack>
                        </Box>
                      </GridItem>

                      <GridItem />

                      <GridItem w='100%' mt='5'>
                      <Text as={'b'} color='white' fontSize={'xl'}>Farm / Withdraw DVX</Text>
                      </GridItem>

                     <GridItem />

                     <GridItem w='100%'>
                      <Box p='5' bgColor={'#132144'} borderRadius='12'>
                      <HStack>
                      <Text color='white'><b>Farm</b></Text>
                      <FarmingAddButton 
                      ub={localStorage.getItem('userBalance')} 
                      ui={userInfo} 
                      allowanceFunction={allowanceErc20}
                      allowance={localStorage.getItem('ercApprove')}
                      />
                        </HStack>
                        </Box>
                      </GridItem>

                      <GridItem w='100%'>
                      <Box p='5' bgColor={'#132144'} borderRadius='12'>
                      <HStack>
                      <Text color='white'><b>Withdraw</b></Text>
                      <FarmingWithdrawButton />
                        </HStack>
                        </Box>
                      </GridItem>

                    </Grid>
          </>
        )}
                  
                    </Box>
    </>
  )
}

export default FarmingBox