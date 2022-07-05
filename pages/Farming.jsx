import React from 'react'

import { Input, Button, Text, Grid, GridItem, Box, Center, VStack, HStack, Container, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, InputLeftAddon, InputGroup } from '@chakra-ui/react';

import Background from '../assets/bg-tabs.png';

const Farming = () => {
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
    <Container maxW={'100%'}>
    <Center>
      <Text as='b' pb='20' color='white' fontSize={'4xl'} align='center'>
        Farm DVX-BNB LP and get DVX rewards
      </Text>
    </Center>
    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', ]} 
    align='center' pb='10' gridRowGap={10}
    >

      <GridItem align={'center'}>
      <Box color={'#1b1545'} width='80%'    
                    height={'150'}
                    bgColor='#10044c'
                    border='1px' 
                    borderRadius='20'
                    bgImage={Background.src} bgPosition='center' bgSize={'100%'}
                    >
                    <VStack p={7}>
                        <Text color="#FF0080" mb='-2.5' fontSize={'1xl'}><b>APY Rate:</b></Text>
                        <Text color='white' fontSize={'4xl'}><b>34%</b></Text>
                        </VStack>
                    </Box>
      </GridItem>


      <GridItem align='center'>
      <Box color={'#1b1545'} width='80%'
                    height={'150'} 
                    border='1px' 
                    borderRadius='20' bgImage={Background.src} bgPosition='center' bgSize={'100%'}
                    >
                    <VStack p={7}>
                        <Text color="#FF0080" mb='-2.5' fontSize={'1xl'}><b>TVL:</b></Text>
                        <Text color='white' fontSize={'4xl'}><b>$123,456</b></Text>
                        </VStack>
                    </Box>
      </GridItem>

      <GridItem align='center'>
      <Box color={'#1b1545'} width='80%'    
                    height={'150'}
                    border='1px' 
                    borderRadius='20' 
                    bgImage={Background.src} bgPosition='center' bgSize={'100%'}
                    >
                    <VStack p={7}>
                        <Text color="#FF0080" mb='-2.5' fontSize={'1xl'}><b>Active Farmers:</b></Text>
                        <Text color='white' fontSize={'4xl'}><b>1,256</b></Text>
                        </VStack>
                    </Box>
      </GridItem>


      <GridItem align='center'>
      <Box color={'#1b1545'} width='80%'    
                    height={'150'}
                    border='1px' 
                    borderRadius='20' 
                    bgImage={Background.src} bgPosition='center' bgSize={'100%'}
                    >
                    <VStack p={7}>
                        <Text color="#FF0080" mb='-2.5' fontSize={'1xl'}><b>Given Rewards(DVX):</b></Text>
                        <Text color='white' fontSize={'4xl'}><b>50,043,126</b></Text>
                        </VStack>
                    </Box>
      </GridItem>

      
    </Grid>
    <Center>
    <Box color={'#1b1545'} width='90%' mb='20' p='10' mt='2'
                    height={'100%'}
                    border='1px' 
                    borderRadius='20' 
                    bgColor='#0d1836'
                    borderColor={'#FF0080'} 
                    boxShadow='#FF0080 0px 2px 15px'
                    >
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
                        <Text align='right' color='white' flex='1'>267,123 DVX</Text>
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
                        </HStack>
                        </Box>
                      </GridItem>

                      <GridItem w='100%'>
                      <Box p='5' bgColor={'#132144'} borderRadius='12'>
                      <HStack>
                      <Text color='white'><b>Withdraw</b></Text>
                      <Button position={'absolute'} float='right' right={['27%', '20%', '15%', '13%', '10%']}
                        size='xs'
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        color='white'
                        maxW={'20%'}
                        fontSize={['12px', null, null, null, '100%']}
                        _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
                        px={15} borderRadius={40}>
                      <b>-</b>
                      </Button>
                        </HStack>
                        </Box>
                      </GridItem>

                    </Grid>
                    </Box>
    </Center>
    </Container>

    <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Farm DVX-BNB LP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text><b>DVX-BNB LP in your wallet:</b> 23,456</Text>
            <Text><b>DVX-BNB LP farmed:</b> 23,456</Text>
            <br />
            <InputGroup>
              <InputLeftAddon children='DVX-BNB LP' />
              <Input type='number' placeholder='Amount To Farm' />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
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
             Star Farming
            </Button>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Farming