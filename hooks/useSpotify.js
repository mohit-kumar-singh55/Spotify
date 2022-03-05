import React, { useEffect } from 'react'
import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from 'spotify-web-api-node';

const spofityApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

const useSpotify = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }

            spofityApi.setAccessToken(session.user.accessToken);
        }
    }, [session])


    return spofityApi;
}

export default useSpotify