import { atom } from "recoil";

export const playlistIdState = atom({
    key: 'playlistIdState',
    default: 'hardcoded',
})

export const playlistState = atom({
    key: 'playlistState',
    default: null,
})