<script>
    import {gql} from "@apollo/client";
    import {getContext} from "svelte";
    import {FormGroup, Input, Modal, ModalBody, ModalHeader} from "sveltestrap";
    import {fieldIdWritable} from "./global";

    export let show;
    export let technologyEvaluate;

    const client = getContext('graphql-client');
    let fieldId;
    fieldIdWritable.subscribe(id => {
        fieldId = id;
        console.log("Updated fieldId: " + fieldId)
    })

    const MATURITY_VALUES = gql`query { maturity_values { id name } }`;
    const maturityValuesQuery = client.query({ query: MATURITY_VALUES }).then(r => r.data.maturity_values);

    const selectMaturityValue = maturityValueId => {
        const INSERT_EVALUATION =
            gql`mutation insert_evaluation($evaluation: evaluations_insert_input!) {
                  insert_evaluations_one(object: $evaluation, on_conflict: {constraint: evaluations_pkey}) {
                    id
                  }
                }`;
        client.mutate({ mutation: INSERT_EVALUATION, variables: { evaluation: { technology_field_id: fieldId, technology_id: technologyEvaluate.id, maturity_value_id: maturityValueId}}})
            .then(r => {
                console.log(r);
                show = false;
            });
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
