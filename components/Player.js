import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

const Player = () => {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo();

    return (
        <div>
            {/* left */}
            <div>
                <img className='hidden md:inline h-10 w-10' src={songInfo?.album?.images?.[0]?.url} alt="album" />
            </div>
        </div>
    )
}

export default Player