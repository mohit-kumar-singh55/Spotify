import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { showLikedModalState } from "../atoms/modalAtom";
import Song from './Song';
import useSpotify from "../hooks/useSpotify";

const LikedModal = () => {
    const spotifyApi = useSpotify();
    const [open, setOpen] = useRecoilState(showLikedModalState);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        spotifyApi.getMySavedTracks().then((res) => {
            setSongs(res?.body?.items);
        }).catch((err) => console.log(err));
    }, [])


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={setOpen}
            >
                <div className='flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-out duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-[#121212] bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-out duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-95'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block overflow-y-scroll align-middle bg-[#282828] text-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all h-fit max-h-[650px] lg:max-w-5xl md:max-w-3xl sm:my-8 sm:align-middle sm:w-full sm:p-6 sm:max-w-2xl'>
                            <div>
                                {songs.length !== 0 ? (
                                    <div className='text-white px-2 flex flex-col space-y-1'>
                                        {songs?.map((tracks, i) => (
                                            <Song key={tracks.track.id} order={i + 1} track={tracks.track} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className='px-8 text-gray-400 text-center font-semibold text-lg'>
                                        <p>You don't have any liked song!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default LikedModal;