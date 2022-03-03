import React from 'react';
import { getProviders, signIn } from "next-auth/react";

const login = ({ providers }) => {
    return (
        <div>login</div>
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