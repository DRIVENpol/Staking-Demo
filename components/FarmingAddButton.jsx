import React from 'react'

import { Input, Button, Text, Box, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, InputLeftAddon, InputGroup } from '@chakra-ui/react';
  

const FarmingAddButton = () => {

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

                      <Modal isCentered isOpen={isOpen} onClose={onClose}
                      >
        {overlay}
        <ModalContent bgColor='#0d1836' color={'white'} border='2px' borderColor={'#FF0080'}>
          <ModalHeader>Farm DVX-BNB LP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP in your wallet:</b> 23,456</Text>
            </Box>

            <Box bgColor={'#15234a'} p='2' borderRadius={'10'} mb='1'>
            <Text><b>DVX-BNB LP farmed:</b> 23,456</Text>
            </Box>
            <br />
            <InputGroup>
              <InputLeftAddon bgColor={'#15234a'}>DVX-BNB LP</InputLeftAddon>
              <Input type='number' placeholder='Amount To Farm' />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
          <Button
              variant={'solid'}
              size='md'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['75%', null, '100%', '100%', '100%']}
              ml="30px"
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
              px={6} borderRadius={20}>
             Star Farming
            </Button>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default FarmingAddButton