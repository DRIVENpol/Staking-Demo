import React from 'react'

import { Input, Button, Text, Box, HStack, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, InputLeftAddon, InputGroup, Center, Grid,
  GridItem } from '@chakra-ui/react';
  

const FarmingWithdrawButton = () => {
    const OverlayTwo = () => (
        <ModalOverlay
          // bg='black'
          // opacity='0.2'
          backdropFilter='auto'
          // backdropInvert='10%'
          backdropBlur='5px'
        />
      )
    
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayTwo />)

  return (
    <>
        <Button position={'absolute'} float='right' right={['27%', '20%', '15%', '13%', '10%']}
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
                      <b>-</b>
                      </Button>

                      <Modal isCentered isOpen={isOpen} onClose={onClose} size='2xl' 
                      >
        {overlay}
        <ModalContent bgColor='#0d1836' color={'white'} border='2px' borderColor={'#FF0080'} p='6' borderRadius={20}>
          <ModalHeader>Withdraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP in your wallet:</b> 23,456</Text>
            </Box>

            <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP farmed:</b> 23,456</Text>
            </Box>

            <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>Pending Rewards:</b> 23,456</Text>
            </Box>
            <br />
            <InputGroup>
            <InputLeftAddon bgColor={'#15234a'}>DVX-BNB LP</InputLeftAddon>
              <Input type='number' placeholder='Amount To Withdraw' />
            </InputGroup>
          </ModalBody>
          <ModalFooter>

          <Grid templateColumns='repeat(2, 1fr)' gap={1} align='center'>
              <GridItem w='100%'>
              <Button
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               mr={5} borderRadius={20}>
             Withdraw LP Tokens
            </Button>

              </GridItem>


              <GridItem w='100%'>
              <Button
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={20}>
             Withdraw Rewards
            </Button>
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