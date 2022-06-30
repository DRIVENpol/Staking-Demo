import React from 'react'
import { Image, Text, Box, Center, VStack, Button,
Grid, GridItem, Link } from '@chakra-ui/react';

const LatestNews = () => {
  const articles = [{
    "title": "Article Title 1",
    "link": "https://github.com/DRIVENpol/nft-launchpad-covalent-api"},
    {
      "title": "Article Title 2",
      "link": "https://github.com/DRIVENpol/nft-launchpad-covalent-api"},
      {
        "title": "Article Title 3",
        "link": "https://github.com/DRIVENpol/nft-launchpad-covalent-api"},
      ];

  return (
    <>
      <VStack pb='20'>
        <Text color='white' fontSize={'6xl'} mt='20' mb='10' align={'center'}>
          <b>Latest news!</b>
          </Text>
          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', ]} gap={6} 
          width={['100%', '100%', '90%', '80%', '75%']}>
            <GridItem>
            
            <Box color={'#1b1545'}
                    width={'100%'} 
                    height={'245'} 
                    border='1px' 
                    borderRadius='20' 
                    borderColor={'#FF0080'}
                    boxShadow='#FF0080 0px 2px 15px'
                    mb={2}
                    bgImage={'https://lh3.googleusercontent.com/G5V8Tny1jONBKHZfsAEiOVUYaKMUMgQuo-VwfHBa8_AAgsmAuWdz7lPq6UUmK5dCfilaaNBIOe5l1UoqiHAOyDoD5lAKZpxZtmtOZQ=h600'}
                    bgPosition='center'
                    >
                     <Box bg='#FF0080' w='100%' h='55px' borderTopRadius={17} p={4} color='white' >
                        <Text as={'b'} noOfLines='1' fontSize={['14px', null, null, null, '15px']}> [BREAKING NEWS]: Breaking News Title</Text>
                      </Box>
                    </Box>
            </GridItem>

<GridItem w='100%'>
  {articles && articles.map(a => (<>
    <Box color={'#1b1545'}
                    width={'100%'} 
                    height={'75'} 
                    border='1px' 
                    borderRadius='10' 
                    borderColor={'#FF0080'} 
                    mb={2} p='6'>
<Grid templateColumns='repeat(5, 1fr)' gap={4}>
  <GridItem colSpan={2}>
    <Text as='b' color='white' fontSize={['14px', null, null, null, '15px']} noOfLines={1}>
      {a.title}
    </Text>
    </GridItem>
    
    <GridItem colStart={5} colEnd={8}>
    <Link href={a.link} target='_blank' ><Button
      variant={'solid'}
      size='10px'
      bgGradient='linear(to-l, #7928CA, #FF0080)'
      color='white'
      maxW={'100%'}
      height='7'
      fontSize={['12px', null, null, null, '12px']}
      _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
      px='10' mr='10'>
        <b>Read More</b>
      </Button></Link>
      </GridItem>
</Grid>
</Box>
    </>))}

</GridItem>
<GridItem />
<GridItem></GridItem>
</Grid>
         
</VStack>
    </>
  )
}

export default LatestNews