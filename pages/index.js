import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ThreadsAuthButton from '@components/ThreadsAuthButton'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to TRBG!" />
        <ThreadsAuthButton />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}