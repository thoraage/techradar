<script>
    import {gql} from "@apollo/client";
    import {getContext} from "svelte";
    import {FormGroup, Input, Modal, ModalBody, ModalHeader} from "sveltestrap";

    export let show;
    export let technologyEvaluate;

    const client = getContext('graphql-client');

    const MATURITY_VALUES = gql`query { maturity_values { id name } }`;
    const maturityValuesQuery = client.query({ query: MATURITY_VALUES }).then(r => r.data.maturity_values);

    const selectMaturityValue = maturityValueId => {
        console.log("Selected: " + maturityValueId);
        show = false;
    };
    let technologyEvaluateOpenToggle = () => show = false;
</script>

<Modal isOpen={show} toggle={technologyEvaluateOpenToggle}>
    <ModalHeader {show}>{technologyEvaluate.name}</ModalHeader>
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
