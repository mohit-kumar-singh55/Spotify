import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Center from '../components/Center';
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";

const Home = () => {
  return (
    <div className="bg-black overflow-hidden h-screen">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0'>
        <Player />
      </div>

    </div>
  )
}

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  }
}