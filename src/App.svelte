<script>
    import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
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
    const fieldsQuery = client.query({ query: FIELDS });
    console.log(fieldsQuery);
    fieldsQuery.then(response => {
        console.log(response);
    });
    fieldsQuery.catch(reason => {
        console.log("What happened: " + reason);
    })
    $: fields = fieldsQuery;
    $: arrived = fieldsQuery.data ? true : false;
    let name = "Biden";
</script>

<style>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>

<h1>Let's go {arrived}</h1>

<Form>
    <FormGroup>
        <Input type="select" name="select" id="exampleSelect">
            {#await fields}
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            {:then f}
                {#each f.data.technology_fields as field}
                    <option>{field.name}</option>
                {/each}
            {:catch error}
                Don't know what to say: {error}
            {/await}
        </Input>
    </FormGroup>
</Form>
