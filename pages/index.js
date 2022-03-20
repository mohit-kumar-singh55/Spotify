import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Center from '../components/Center';
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import Alert from '../components/Alert';
import Modal from '../components/Modal';
import LikedModal from '../components/LikedModal';

const Home = () => {
  return (
    <div className="bg-black overflow-hidden h-screen">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Alert for notifying that only premium users can play music */}
      <Alert alert="Note: As per Spotify, Only premium users can play music!" />

      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0'>
        <Player />
      </div>

      <Modal />
      <LikedModal />

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