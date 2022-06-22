<script>
    import {Col, Row, Styles} from 'sveltestrap';
    import {
        Form,
        FormGroup, Icon,
        Input,
        InputGroup,
        InputGroupText,
        ListGroup,
        ListGroupItem
    } from 'sveltestrap';
    import {ApolloClient, InMemoryCache} from '@apollo/client';

    const client = new ApolloClient({
        uri: 'http://localhost:8080/v1/graphql',
        cache: new InMemoryCache()
    });
    import {setClient} from "svelte-apollo";
    import {gql} from '@apollo/client';
    import { query } from "svelte-apollo";


    // export let authToken;

    // setClient(client);

    const FIELDS = gql`query { technology_fields { id name description } }`;
    const fieldsQuery = client.query({ query: FIELDS }).then(r => r.data.technology_fields);

    $: technologiesQuery = Promise.allSettled([]);

    function searchTechnology(search) {
        if (search.length >= 1) {
            const TECHNOLOGIES = gql`query ($search: String!) { technologies(where: { name: { _ilike: $search }}) { id name } }`;
            let variables = {search: "%" + search + "%"};
            technologiesQuery = client.query({
                query: TECHNOLOGIES,
                variables: variables
            }).then(r => r.data.technologies);
        } else {
            technologiesQuery = Promise.allSettled([]);
        }
    }
</script>

<Styles/>
<div class="container">
    <Row><Col sm={{ size: 6, order: 2, offset: 1 }}>
        <Form>
            <FormGroup>
                <InputGroup>
                    <InputGroupText><Icon name="bag" /></InputGroupText>
                    <Input type="select">
                        {#await fieldsQuery then fields}
                            {#each fields as field}
                                <option>{field.name}</option>
                            {/each}
                        {/await}
                    </Input>
                </InputGroup>
                <InputGroup>
                    <InputGroupText><Icon name="search" /></InputGroupText>
                    <Input type="text" placeholder="Search technology to evaluate" on:input={event => searchTechnology(event.target.value)}/>
                </InputGroup>
                <ListGroup>
                    {#await technologiesQuery then technologies}
                        {#each technologies as technology}
                            <ListGroupItem>{technology.name}</ListGroupItem>
                        {/each}
                    {/await}
                </ListGroup>
            </FormGroup>
        </Form>
    </Col></Row>
</div>

<style>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>

