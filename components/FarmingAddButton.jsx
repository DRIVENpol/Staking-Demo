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

  const mainScAddress = "0x5F787db64B1313B981579A02673559f292f552DB";
  const stakeTokenAddress = "0xe278058F6598F712095DA268367f267F9E250D4A";

  const [isApproved, setIsApproved] = useState(true);
  const [toStake, setToStake] = useState(1);
  const [userBalance, setUserBalance] = useState("");
  const [approvedBalance, setApprovedBalance] = useState(0);



  async function checkApproved() {

    const iProvider = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/qSQowMkVnht5prnNyhu9DF8w-oBdrcww");

    const abi =["function balanceOf(address account) public view returns (uint256)",
    "function allowance(address owner, address spender) public view returns (uint256)"];

    const connectedContract = new ethers.Contract(stakeTokenAddress, abi, iProvider);


    // setUserBalance(Number(_userBalance));
    let _allowedBalance = await connectedContract.allowance(props.acc, mainScAddress);
    let _userBalance = await connectedContract.balanceOf(props.acc);

    setUserBalance((_userBalance / 10 ** 18).toLocaleString());
    setApprovedBalance(_allowedBalance);

    if(toStake > _allowedBalance) {
      setIsApproved(false);
    } else {
      setIsApproved(true);
    }

};

useEffect(() => {
  checkApproved();
}, [])

    // const [toStake, setToStake] = useState(0);

      const toStakeChangeHandler = (event) => {

        let _num = Number(event.target.value);
        setToStake(_num * 10 ** 18);

        checkApproved();
      
        // console.log("======= APPROVE STATE =======");
        // console.log("To stake: " + Number(toStake));
        // console.log("User Balance: " + userBalance);
        // console.log("Approved Balance: " + approvedBalance);
        // console.log("Is approved? " + isApproved);
        // console.log("==============");
      }


      const OverlayTwo = () => (
        <ModalOverlay
          // bg='black'
          // opacity=''
          backdropFilter='auto'
          // backdropInvert='10%'
          backdropBlur='5px'
        />
      )
    
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayTwo />)



      

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
            <Text><b>DVX-BNB LP in your wallet:</b> {userBalance}</Text>
            </Box>

            <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP farmed:</b> 23,456</Text>
            </Box>
            <br />
            <InputGroup>
              <InputLeftAddon bgColor={'#15234a'}>DVX-BNB LP</InputLeftAddon>
              <Input onChange={toStakeChangeHandler} type='number' placeholder='Amount To Farm' />
            </InputGroup>
          </ModalBody>
          <ModalFooter>

        {isApproved === true ? (<>
          <Button
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={20}>
             Start Farming
            </Button>
        </>) : (<>
          <Button
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={20}>
             Approve
            </Button>
        </>)}
         
          


            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default FarmingAddButton