import React, { useEffect, useState } from 'react';
import { HomeIcon, SearchIcon, LibraryIcon, HeartIcon, RssIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpofity from "../hooks/useSpotify";
import { useRecoilState } from 'recoil';
import { playlistIdState } from "../atoms/playlistAtom";
import Link from 'next/link';
import { showModalState } from "../atoms/modalAtom";

const Sidebar = () => {
    const { data: session, status } = useSession();
    const [playList, setPlayList] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const [open, setOpen] = useRecoilState(showModalState);

    const spotifyApi = useSpofity();

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlayList(data.body.items);
            })
        }
    }, [session, spotifyApi])


    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem pb-36] lg:max-w-[15rem] hidden md:inline-flex border-r border-gray-900 overflow-y-scroll h-screen'>
            <div className='space-y-4'>
                <Link href="/">
                    <button className='flex items-center space-x-2 hover:text-white'>
                        <HomeIcon className="h-5 w-5" />
                        <p>Home</p>
                    </button>
                </Link>
                <button className='flex items-center space-x-2 hover:text-white' onClick={() => setOpen(true)}>
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white disabled:text-gray-700' disabled>
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900' />

                <button className='flex items-center space-x-2 hover:text-white' onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white' onClick={() => setOpen(true)}>
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white disabled:text-gray-700' disabled>
                    <RssIcon className="h-5 w-5" />
                    <p>Your episodes</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900' />

                {/* Playlists */}
                {playList.map((playList) => (
                    <p key={playList.name}
                        className='cursor-pointer hover:text-white'
                        onClick={() => setPlaylistId(playList.id)}>
                        {playList.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar