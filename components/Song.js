import React from 'react';
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();

    return (
        <div className='grid grid-cols-2 text-gray-500 py-4 px-5 cursor-pointer hover:bg-gray-900 rounded-lg duration-300'>
            <div className='flex items-center space-x-4'>
                <p>{order}</p>
                <img className='w-10 h-10' src={track?.track?.album?.images?.[0]?.url} alt="song" />
                <div>
                    <p className='w-36 lg:w-64 truncate text-white'>{track?.track?.name}</p>
                    <p className='w-40'>{track?.track?.artists?.[0]?.name}</p>
                </div>
            </div>

            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='hidden md:inline w-40 truncate'>{track?.track?.album?.name}</p>
                <p>{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song