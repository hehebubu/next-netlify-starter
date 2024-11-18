import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ThreadsAuthButton from '@components/ThreadsAuthButton'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <Image
            src="/main_logo.png"
            alt="TRBG Logo"
            width={200}
            height={100}
            priority
            className="logo"
          />
        </Link>
        <Header title="Welcome to TRBG!" />
        
        <ThreadsAuthButton />
        <p className="description">
          Powered by @<a href="https://www.threads.net/@hehe_bubu" className="description">hehe_bubu </a>
        </p>
      </main>

      <Footer />
    </div>
  )
}