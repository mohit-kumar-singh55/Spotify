import React from 'react';
import { getProviders, signIn } from "next-auth/react";


const login = ({ providers }) => {
    useEffect(() => {
        document.title = "Login | Spotify"
    }, [])

    return (
        <div className='flex flex-col min-h-screen items-center justify-center bg-black'>
            <img className='w-52 mb-5' src="https://links.papareact.com/9xl" alt="logo" />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className='bg-[#18D860] text-white p-5 rounded-full'
                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}   // whenever I will change the website I need to change the Redirect URIs in developer.spotify.com's setting to https://mysite.com/api/auth/callback/spotify
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}