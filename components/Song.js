import React from 'react';
import useSpotify from "../hooks/useSpotify";

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();

    return (
        <div>
            <div>
                <p>{order}</p>
                <img className='w-10 h-10' src={track?.track?.album?.images?.[0]?.url} alt="song" />
            </div>
        </div>
    )
}

export default Song