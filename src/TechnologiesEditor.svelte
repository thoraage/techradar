<script>
    import {FormGroup, Icon, Input, ListGroup, ListGroupItem} from 'sveltestrap';
    import {getContext} from 'svelte';
    import {gql} from '@apollo/client';
    import NewTechnologyForm from "./NewTechnologyForm.svelte";
    import TechnologyEvaluate from "./TechnologyEvaluate.svelte";

    const client = getContext('graphql-client');

    $: technologiesQuery = Promise.allSettled([]);
    let showTechnologiesList = false;

    const searchTechnology = (search) => {
        if (search.length >= 1) {
            const TECHNOLOGIES = gql`query ($search: String!) { technologies(where: { name: { _ilike: $search }}) { id name } }`;
            let variables = {search: "%" + search + "%"};
            technologiesQuery = client.query({
                query: TECHNOLOGIES,
                variables: variables,
                fetchPolicy: 'network-only'
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

    const evaluateTechnology = (technology) => {
        currentTechnologyEvaluate = technology
        isTechnologyEvaluateOpen = true;
    }

    let currentTechnologyEvaluate;
    let isTechnologyEvaluateOpen = false;
    let technologyEvaluateOpenToggle = () => (isTechnologyEvaluateOpen = !isTechnologyEvaluateOpen);
</script>

<FormGroup floating>
    <Input type="text" placeholder="Search technology to evaluate" bind:value={technologyName}
           on:input={(event) => searchTechnology(event.target.value)}/>
    <div slot="label"><Icon name="search" /> Search technology to evaluate</div>
    {#await technologiesQuery then technologies}
        {#if showTechnologiesList}
            <ListGroup>
                <ListGroupItem active on:click={() => isNewTechnologyOpen = true}>Add new technology...</ListGroupItem>
                {#each technologies as technology, i}
                    <ListGroupItem on:click={() => evaluateTechnology(technology)}>{technology.name}</ListGroupItem>
                {/each}
            </ListGroup>
        {/if}
    {/await}
</FormGroup>

<NewTechnologyForm bind:show={isNewTechnologyOpen} {technologyName}/>

<TechnologyEvaluate bind:show={isTechnologyEvaluateOpen} technologyEvaluate={currentTechnologyEvaluate}/>
