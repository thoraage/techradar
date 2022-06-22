<script>
    import {Form, FormGroup, FormText, Input, Label, ListGroup, ListGroupItem} from 'sveltestrap';
    import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

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
    fieldsQuery.catch(reason => {
        console.log("What happened: " + reason);
    })

    $: technologiesQuery = Promise.allSettled([]);

    function searchTechnology(search) {
        if (search.length >= 1) {
            const TECHNOLOGIES = gql`query ($search: String!) { technologies(where: { name: { _ilike: $search }}) { id name } }`;
            let variables = {search: "%" + search + "%"};
            technologiesQuery = client.query({
                query: TECHNOLOGIES,
                variables: variables
            }).then(r => r.data.technologies);
            technologiesQuery.then(console.log);
        } else {
            technologiesQuery = Promise.allSettled([]);
        }
    }
</script>

<h1>Tech Radar</h1>
<Form>
    <FormGroup>
        <Input type="select">
            {#await fieldsQuery then fields}
                {#each fields as field}
                    <option>{field.name}</option>
                {/each}
            {/await}
        </Input>
        <Input type="text" on:input={event => searchTechnology(event.target.value)}/>
        <ListGroup>
            {#await technologiesQuery then technologies}
                {#each technologies as technology}
                    <ListGroupItem>{technology.name}</ListGroupItem>
                {/each}
            {/await}
        </ListGroup>
    </FormGroup>
</Form>

<style>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>

