<script>
    import {
        Button,
        FormGroup,
        Icon,
        Input, Label,
        ListGroup,
        ListGroupItem, Offcanvas
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

    let isNewTechnologyOpen = false;
    let technologyName;
    let technologyDescription;
    let toggleNewTechnologyOpen = () => (isNewTechnologyOpen = !isNewTechnologyOpen);
    let submitTechnology = () => {
        const INSERT_TECHNOLOGY =
            gql`mutation insert_technology($technology: technologies_insert_input!) {
                  insert_technologies_one(object: $technology) {
                    id
                  }
                }`;
        client.mutate({ mutation: INSERT_TECHNOLOGY, variables: { technology: { name: technologyName, description: technologyDescription}}})
            .then(r => {
                console.log(r);
                toggleNewTechnologyOpen = false;
            });
    };
</script>

<FormGroup floating>
    <Input type="text" placeholder="Search technology to evaluate"
           on:input={(event) => searchTechnology(event.target.value)}/>
    <div slot="label"><Icon name="search" /> Search technology to evaluate</div>
    {#await technologiesQuery then technologies}
        {#if showTechnologiesList}
            <ListGroup>
                <ListGroupItem active on:click={() => isNewTechnologyOpen = true}>Add new technology...</ListGroupItem>
                {#each technologies as technology, i}
                    <ListGroupItem>{technology.name}</ListGroupItem>
                {/each}
            </ListGroup>
        {/if}
    {/await}
</FormGroup>

<Offcanvas
        isOpen={isNewTechnologyOpen}
        placement="end"
        header="Add new technology"
        toggle={toggleNewTechnologyOpen}>
    <FormGroup>
        <Label for="technologyName">Name</Label>
        <Input type="text" id="technologyName" bind:value={technologyName}/>
    </FormGroup>
    <FormGroup>
        <Label for="technologyDescription">Description</Label>
        <Input type="text" id="technologyDescription" bind:value={technologyDescription}/>
    </FormGroup>
    <Button color="primary" on:click={submitTechnology}><Icon name="plus-square"/> Submit</Button>
</Offcanvas>

