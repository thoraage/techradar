import {Auth0Client} from "@auth0/auth0-spa-js";
import {ApolloClient, ApolloLink, from, HttpLink, InMemoryCache} from "@apollo/client";

async function createAuth0Client() {
    const AUTH_CONFIG = {
        domain: "techradar.eu.auth0.com",
        client_id: "EZm0132Guc2kIO7NVSuY3xC5bR4BgbUl",
        redirect_uri: "http://localhost:3000/callback",
        audience: "tech-radar",
    };
    const auth0 = new Auth0Client(AUTH_CONFIG);
    await auth0.checkSession();
    return auth0;
}

const onRedirectCallback = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

export const getUser = async (setAccessToken) => {
    let auth0Client = await createAuth0Client();

    if (window.location.search.includes("code=")) {
        const { appState } = await auth0Client.handleRedirectCallback();
        onRedirectCallback(appState);
    }

    let isAuthenticated = await auth0Client.isAuthenticated();

    let user;
    if (isAuthenticated) {
        user = await auth0Client.getUser();
        const idTokenClaims = await auth0Client.getIdTokenClaims();
        const idToken = idTokenClaims.__raw;
        setAccessToken(await auth0Client.getTokenSilently());
    }
    return user;
};

export const authenticateIfNot = async () => {
    let auth0Client = await createAuth0Client();
    if (!await auth0Client.isAuthenticated()) {
        auth0Client.loginWithRedirect({});
    }
}

export const logout = async () => {
    console.log('Logout');
    const auth0Client = await createAuth0Client();
    auth0Client.logout({
        returnTo: 'http://localhost:3000/'
    });
}

export const createClient = (errorLink, getAccessToken) => {
    const httpLink = new HttpLink({
        uri: 'http://localhost:8080/v1/graphql',
    });
    const authLink = new ApolloLink((operation, forward) => {
        if (getAccessToken()) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${getAccessToken()}`
                }
            });
        }
        return forward(operation);
    });
    return new ApolloClient({
        link: from([errorLink, authLink, httpLink]),
        cache: new InMemoryCache(),
    });
}
