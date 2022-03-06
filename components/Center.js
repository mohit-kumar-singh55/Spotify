import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from "../hooks/useSpotify";
import Songs from './Songs';

const colors = [
    "from-purple-500",
    "from-pink-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-cyan-500",
    "from-violet-500",
    "from-orange-500",
    "from-yellow-500",
]

const Center = () => {
    const { data: session } = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();


    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((err) => console.log("Something went Wrong!", err))
    }, [spotifyApi, playlistId])


    return (
        <div className='flex-grow h-screen overflow-y-scroll'>
            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    <img className='rounded-full w-10 h-10' src={session?.user?.image} alt="user_img" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='w-5 h-5' />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-8`}>
                <img className='w-44 h-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="img" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
                </div>
            </section>

            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center