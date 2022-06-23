<script>
    import {
        Card,
        Col,
        Nav,
        Navbar,
        NavbarBrand,
        NavItem,
        Row,
        Styles,
        TabContent,
        TabPane
    } from 'sveltestrap';
    import {
        FormGroup,
        Icon,
        Input,
        ListGroup,
        ListGroupItem
    } from 'sveltestrap';
    import {ApolloClient, InMemoryCache} from '@apollo/client';
    import FieldSelector from './FieldSelector.svelte'

    const client = new ApolloClient({
        uri: 'http://localhost:8080/v1/graphql',
        cache: new InMemoryCache()
    });
    setContext("graphql-client", client);
    import {gql} from '@apollo/client';
    import {setContext} from "svelte";


    $: technologiesQuery = Promise.allSettled([]);
    let showTechnologiesList = false;

    function searchTechnology(search) {
        if (search.length >= 1) {
            const TECHNOLOGIES = gql`query ($search: String!) { technologies(where: { name: { _ilike: $search }}) { id name } }`;
            let variables = {search: "%" + search + "%"};
            technologiesQuery = client.query({
                query: TECHNOLOGIES,
                variables: variables
            }).then(r => {
                showTechnologiesList = true;
                return r.data.technologies;
            });
        } else {
            showTechnologiesList = false;
            technologiesQuery = Promise.allSettled([]);
        }
    }

    function createNewTechnology() {
        console.log("Create new technology")
    }
</script>

<Styles/>
<div class="container">
    <Navbar color="light" light expand="md">
        <NavbarBrand href="/">TechRadar</NavbarBrand>
        <Nav class="ms-auto" navbar>
            <NavItem>
                <FieldSelector {client}/>
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
                    <FormGroup floating>
                        <Input type="text" placeholder="Search technology to evaluate"
                               on:input={(event) => searchTechnology(event.target.value)}/>
                        <div slot="label"><Icon name="search" /> Search technology to evaluate</div>
                        {#await technologiesQuery then technologies}
                            {#if showTechnologiesList}
                                <ListGroup>
                                    <ListGroupItem active on:click={() => createNewTechnology()}>Create new technology...</ListGroupItem>
                                    {#each technologies as technology, i}
                                        <ListGroupItem>{technology.name}</ListGroupItem>
                                    {/each}
                                </ListGroup>
                            {/if}
                        {/await}
                    </FormGroup>
                </Card>
            </TabPane>
        </TabContent>
    </Col></Row>
</div>

<style>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>

