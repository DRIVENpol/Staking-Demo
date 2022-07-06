import React, { useState } from 'react'
import { Text, Grid, GridItem, Box, HStack, Spinner, Center, Container, Button } from '@chakra-ui/react';

import FarmingAddButton from './FarmingAddButton';
import FarmingWithdrawButton from './FarmingWithdrawButton';



const StakingBox = () => {

  const [vb, setVb] = useState(true)

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

        {vb === true ? (
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
                      <FarmingAddButton />
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

export default StakingBox