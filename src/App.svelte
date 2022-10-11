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
    import FieldSelector from './FieldSelector.svelte';
    import TechnologiesEditor from './TechnologiesEditor.svelte';
    import {onMount, setContext} from "svelte";
    import {authenticateIfNot, getUser, logout, createClient} from './auth';
    import {onError} from "@apollo/client/link/error";
    import TechnologiesRadar from "./TechnologiesRadar.svelte";

    let user = null;
    let accessToken = null;

    const errorLink = onError(({ graphQLErrors, networkError, _, operation, forward }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({message, locations, path}) => {
                currentErrorMessage = 'No worky!';
                isErrorOpen = true;
                authenticateIfNot().catch(e => console.log(e));
            });
        }
    });

    const client = createClient(errorLink, () => accessToken);
    setContext("graphql-client", client);
    let currentErrorMessage;
    let isErrorOpen = false;
    onMount(async () => {
        user = await getUser(token => accessToken = token);
    });
    let technologiesRadarVisible = false;
    const setTechnologiesRadarVisible = (visible) => {
        console.log("clicked: " + visible);
        technologiesRadarVisible = visible;
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
                <span slot="tab" on:click={() => setTechnologiesRadarVisible(true)}><Icon name="display" /> Radar</span>
                <Card class="py-5 px-5">
                    <TechnologiesRadar visible={technologiesRadarVisible}/>
                </Card>
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