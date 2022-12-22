import React from 'react'
import Head from 'next/head'
import { AuthProvider } from '../hooks/useAuth'

function App({ Component, pageProps }) {
  return (
    <>
      <Head><title>coke-firebase-auth</title></Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default App