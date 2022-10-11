<script>
    import {Button, FormGroup, Icon, Input, Label, Offcanvas} from "sveltestrap";
    import {gql} from "@apollo/client";
    import {getContext} from "svelte";

    export let show;

    const client = getContext('graphql-client');

    let toggleNewTechnologyOpen = () => (show = !show);
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
                show = false;
            });
    };
    export let technologyName;
    let technologyDescription;
</script>

<Offcanvas
        isOpen={show}
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
