<script>
    import {
        FormGroup,
        Icon,
        Input,
        ListGroup,
        ListGroupItem
    } from 'sveltestrap';
    import {getContext} from "svelte";
    import {gql} from "@apollo/client";

    const client = getContext('graphql-client');

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

