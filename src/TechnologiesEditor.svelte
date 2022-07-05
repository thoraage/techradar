<script>
    import {
        FormGroup,
        Icon,
        Input,
        ListGroup,
        ListGroupItem,
        Modal,
        ModalBody,
        ModalHeader
    } from 'sveltestrap';
    import {getContext} from 'svelte';
    import {gql} from '@apollo/client';
    import NewTechnologyForm from "./NewTechnologyForm.svelte";

    const client = getContext('graphql-client');

    $: technologiesQuery = Promise.allSettled([]);
    let showTechnologiesList = false;

    const searchTechnology = (search) => {
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

    const evaluateTechnology = (technology) => {
        currentTechnologyEvaluate = technology
        isTechnologyEvaluateOpen = true;
    }

    let currentTechnologyEvaluate;
    let isTechnologyEvaluateOpen = false;
    let technologyEvaluateOpenToggle = () => (isTechnologyEvaluateOpen = !isTechnologyEvaluateOpen);

    const MATURITY_VALUES = gql`query { maturity_values { id name } }`;
    const maturityValuesQuery = client.query({ query: MATURITY_VALUES }).then(r => r.data.maturity_values);

    const selectMaturityValue = maturityValueId => {

        console.log("Selected: " + maturityValueId);
        technologyEvaluateOpenToggle();
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
                    <ListGroupItem on:click={() => evaluateTechnology(technology)}>{technology.name}</ListGroupItem>
                {/each}
            </ListGroup>
        {/if}
    {/await}
</FormGroup>

<NewTechnologyForm bind:show={isNewTechnologyOpen}/>

<Modal isOpen={isTechnologyEvaluateOpen} toggle={technologyEvaluateOpenToggle}>
    <ModalHeader {isTechnologyEvaluateOpen}>{currentTechnologyEvaluate.name}</ModalHeader>
    <ModalBody>
        {#await maturityValuesQuery then maturityValues}
            <FormGroup>
                {#each maturityValues as maturityValue}
                    <Input on:change={() => selectMaturityValue(maturityValue.id) } type="radio" value={maturityValue.id} label={maturityValue.name}/>
                {/each}
            </FormGroup>
        {/await}
    </ModalBody>
</Modal>