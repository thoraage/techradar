<script>
    import {
        Card,
        Col,
        Icon,
        Nav,
        Navbar,
        NavbarBrand,
        NavItem,
        Offcanvas,
        Row,
        Styles,
        TabContent,
        TabPane
    } from 'sveltestrap';
    import {ApolloClient, ApolloLink, from, fromPromise, HttpLink, InMemoryCache} from '@apollo/client';
    import FieldSelector from './FieldSelector.svelte';
    import TechnologiesEditor from './TechnologiesEditor.svelte';
    import {onMount, setContext} from "svelte";
    import {onError} from "@apollo/client/link/error";
    import {Auth0Client} from "@auth0/auth0-spa-js";

    let user = null;
    let accessToken = null;
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
    const getUser = async () => {
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
            console.log("Id token: " + idToken);
            accessToken = await auth0Client.getTokenSilently();
            // client = createClient();
            console.log("Access token: " + accessToken);
        }
        return user;
    };

    const authenticateIfNot = async () => {
        let auth0Client = await createAuth0Client();
        if (!await auth0Client.isAuthenticated()) {
            auth0Client.loginWithRedirect({});
        }
    }

    const createClient = () => {
        const httpLink = new HttpLink({
            uri: 'http://localhost:8080/v1/graphql',
        });
        const authLink = new ApolloLink((operation, forward) => {
            if (accessToken) {
                operation.setContext({
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                });
            }
            return forward(operation);
        });
        const errorLink = onError(({ graphQLErrors, networkError, _, operation, forward }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) => {
                    currentErrorMessage = 'No worky!';
                    isErrorOpen = true;
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
                    // getUser()
                    //     .then(user => console.log(user))
                    //     .catch(e => console.log(e));
                    authenticateIfNot().catch(e => console.log(e));
                    console.log(operation.getContext());
                });

            if (networkError) console.log(`[Network error]: ${networkError}`);
        });
        const client = new ApolloClient({
            link: from([errorLink, authLink, httpLink]),
            cache: new InMemoryCache(),
        });
        return client;
    }

    const client = createClient();
    setContext("graphql-client", client);
    let currentErrorMessage;
    let isErrorOpen = false;
    onMount(async () => {
        user = await getUser();
    });
    const logout = async () => {
        console.log('Logout');
        const auth0Client = await createAuth0Client();
        auth0Client.logout({
            returnTo: 'http://localhost:3000/'
        });
    }
</script>

<Styles/>
<div class="container">
    <Navbar color="light" light expand="md">
        <NavbarBrand href="/">TechRadar</NavbarBrand>
        <Nav class="ml-auto" navbar>
            <NavItem>
                <FieldSelector/>
            </NavItem>
        </Nav>
        <Nav class="ms-auto" navbar>
            <span on:click={logout}><Icon name="person" />
                {#if user}{ user.nickname }{:else} Log in {/if}
            </span>
        </Nav>
    </Navbar>
    <Row class="py-5"><Col sm={{ size: 6, order: 2, offset: 1 }}>
        <TabContent>
            <TabPane tabId="radar">
                <span slot="tab"><Icon name="display" /> Radar</span>
            </TabPane>
            <TabPane tabId="evaluate" active>
                <span slot="tab"><Icon name="pencil-square" /> Evaluate</span>
                <Card class="py-5 px-5">
                    <TechnologiesEditor/>
                </Card>
            </TabPane>
        </TabContent>
    </Col></Row>
</div>

<style>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>

<Offcanvas
        isOpen={isErrorOpen}
        toggle={isErrorOpen != isErrorOpen}
        placement="bottom"
        header="Error">
    {currentErrorMessage}
</Offcanvas>