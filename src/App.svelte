<script>
    import {Card, Col, Icon, Nav, Navbar, NavbarBrand, NavItem, Row, Styles, TabContent, TabPane} from 'sveltestrap';
    import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
    import FieldSelector from './FieldSelector.svelte';
    import TechnologiesEditor from './TechnologiesEditor.svelte';
    import {setContext} from "svelte";

    const client = new ApolloClient({
        uri: 'http://localhost:8080/v1/graphql',
        cache: new InMemoryCache()
    });
    setContext("graphql-client", client);
</script>

<Styles/>
<div class="container">
    <Navbar color="light" light expand="md">
        <NavbarBrand href="/">TechRadar</NavbarBrand>
        <Nav class="ms-auto" navbar>
            <NavItem>
                <FieldSelector/>
            </NavItem>
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

