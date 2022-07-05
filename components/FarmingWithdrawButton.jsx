import React from 'react'

import { Input, Button, Text, Grid, GridItem, Box, Center, VStack, HStack, Container, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, InputLeftAddon, InputGroup } from '@chakra-ui/react';
  

const FarmingWithdrawButton = () => {
    const OverlayTwo = () => (
        <ModalOverlay
          // bg='black'
          // opacity='0.2'
          backdropFilter='auto'
          // backdropInvert='10%'
          backdropBlur='2px'
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

                      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Withdraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box bgColor={'#e6e8ec'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP in your wallet:</b> 23,456</Text>
            </Box>

            <Box bgColor={'#e6e8ec'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP farmed:</b> 23,456</Text>
            </Box>

            <Box bgColor={'#e6e8ec'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>Pending Rewards:</b> 23,456</Text>
            </Box>
            <br />
            <InputGroup>
              <InputLeftAddon children='DVX-BNB LP' />
              <Input type='number' placeholder='Amount To Withdraw' />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
          <HStack>
          <Button
              variant={'solid'}
              size='sm'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['75%', null, '100%', '100%', '100%']}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
              display={{ base: 'none', md: 'flex' }} px={6} borderRadius={20}>
             Withdraw LP Tokens
            </Button>

            <Button
              variant={'solid'}
              size='sm'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['75%', null, '100%', '100%', '100%']}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
              display={{ base: 'none', md: 'flex' }} px={6} borderRadius={20}>
             Withdraw Rewards
            </Button>
            {/* <Button onClick={onClose}>Close</Button> */}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FarmingWithdrawButton