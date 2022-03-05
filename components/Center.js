import React from 'react';
import { useSession } from "next-auth/react";

const Center = () => {
    const { data: session } = useSession();

    return (
        <div className='flex flex-grow text-white'>
            <header>
                <div>
                    <img src={session?.user?.image} alt="user_img" />
                    {console.log(session)}
                </div>
            </header>
        </div>
    )
}

export default Center