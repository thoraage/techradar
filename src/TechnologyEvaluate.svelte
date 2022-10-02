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

    const GET_EVALUATION = gql`query search_user_evaluation($technology_id: Int!, $technology_field_id: Int!) {
  evaluations(where: {technology_id: {_eq: $technology_id}, _and: {technology_field_id: {_eq: $technology_field_id}}}) {
    id
    maturity_value_id
  }
}
`;
    let currentEvaluationId = { value: -1 };
    const getEvaluationsQuery = () => {
        const variables = { technology_field_id: fieldId, technology_id: technologyEvaluate.id };
        return client.query({query: GET_EVALUATION, variables: variables})
            .then(r => {
                console.log(r);
                let evaluations = r.data.evaluations;
                if (evaluations.length > 0) {
                    currentEvaluationId.value = evaluations[0].maturity_value_id;
                    console.log("loaded object");
                    console.log(currentEvaluationId);
                }
                return evaluations;
            });
    };
    const insertMaturityValue = maturityValueId => {
        const INSERT_EVALUATION =
            gql`mutation insert_evaluation($evaluation: evaluations_insert_input!) {
                  insert_evaluations_one(object: $evaluation, on_conflict: {constraint: evaluations_pkey}) {
                    id
                  }
                }`;
        let variables = { evaluation: { technology_field_id: fieldId, technology_id: technologyEvaluate.id, maturity_value_id: maturityValueId}};
        client.mutate({ mutation: INSERT_EVALUATION, variables: variables})
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
            {#await getEvaluationsQuery() then evaluations}
                <FormGroup>
                    {#each maturityValues as maturityValue}
                        <Input on:change={() => insertMaturityValue(maturityValue.id) } type="radio"
                               bind:group={currentEvaluationId.value}
                               value={maturityValue.id} label={maturityValue.name}/>
                    {/each}
                </FormGroup>
            {/await}
        {/await}
    </ModalBody>
</Modal>
