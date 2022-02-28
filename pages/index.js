import Head from 'next/head';
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="bg-black overflow-hidden h-screen">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=''>
        <Sidebar />
        {/* <Center /> */}
      </main>

      <div>
        {/* <Player /> */}
      </div>

    </div>
  )
}

export default Home;