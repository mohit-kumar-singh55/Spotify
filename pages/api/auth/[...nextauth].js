import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { isConstructorDeclaration } from "typescript";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.accessToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    }
    catch (e) {
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // Initial SignIn
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                    image: user.image                       // added
                }
            }

            // Return the token if it is not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access Token has expired, so we need to refresh it...
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username
            session.user.image = token.picture                  // added

            return session;
        }
    }
})