import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";

const Center = () => {
    const { data: session } = useSession();
    const [color, setColor] = useState(null)

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

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [])


    return (
        <div className='flex-grow'>
            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    <img className='rounded-full w-10 h-10' src={session?.user?.image} alt="user_img" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='w-5 h-5' />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-8`}>

            </section>
        </div>
    )
}

export default Center