import React, { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { HeartIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { RewindIcon, SwitchHorizontalIcon, VolumeUpIcon, ReplyIcon, PlayIcon, PauseIcon, FastForwardIcon } from "@heroicons/react/solid";
import { debounce } from 'lodash';

const Player = () => {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => setCurrentTrackId(data?.body?.item?.id));
            spotifyApi.getMyCurrentPlaybackState().then(data => setIsPlaying(data?.body?.is_playing));
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session])

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                setIsPlaying(false);
                spotifyApi.pause();
            }
            else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }

    const debouncedJustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => { console.log(err) })
        }, 500),            // delay, waits for event to stop
        []
    )

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedJustVolume(volume);
        }
    }, [volume])

    return (
        <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            {/* left */}
            {isPlaying && <div className='flex items-center space-x-4'>
                <img className='hidden md:inline h-10 w-10' src={songInfo?.album?.images?.[0]?.url} alt="album" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0].name}</p>
                </div>
            </div>}

            {/* center */}
            {isPlaying && <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className='button' />
                <RewindIcon className='button' />
                {isPlaying ? (
                    < PauseIcon onClick={handlePlayPause} className='button w-10 h-10' />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className='button w-10 h-10' />
                )}

                <FastForwardIcon className='button' />
                <ReplyIcon className='button' />
            </div>}

            {/* Right */}
            {isPlaying && <div className='flex items-center space-x-3 justify-end pr-5 md:space-x-4'>
                <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className='button' />
                <input type="range" value={volume} onChange={(e) => setVolume(Number(e.target.value))} min={0} max={100} className='w-14 md:w-28' />
                <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className='button' />
            </div>}
        </div>
    )
}

export default Player