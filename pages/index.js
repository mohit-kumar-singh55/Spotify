import Head from 'next/head';
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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