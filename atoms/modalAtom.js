import { atom } from "recoil";

export const showModalState = atom({
    key: "showModalState",
    default: false,
})

export const showLikedModalState = atom({
    key: "showLikedModalState",
    default: false,
})