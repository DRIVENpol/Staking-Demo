// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

import { Container, Text } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Navbar />
      <Container maxW='100%' bgGradient='linear(to-r, #0f0c29, #302b63)'><Hero />
          <Component {...pageProps} />
          </Container>
        <Footer />
    </ChakraProvider>
  )
}

export default MyApp