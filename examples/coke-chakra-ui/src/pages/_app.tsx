import React from 'react'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import AppTheme from '../theme'

function App({ Component, pageProps }) {
  return (
    <>
      <Head><title>coke-chakra-ui</title></Head>
      <ChakraProvider theme={AppTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App