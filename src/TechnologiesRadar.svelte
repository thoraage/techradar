<script>
    import {getContext, onMount} from "svelte";
    import {gql} from "@apollo/client";
    import {fieldIdWritable} from "./global";

    export let visible;

    const client = getContext('graphql-client');
    let fieldId;
    fieldIdWritable.subscribe(id => fieldId = id);

    function getEvaluations() {
        console.log(fieldId);
        let GET_TECHNOLOGIES = gql`
            query evaluations_for_field($technology_field_id: Int!) {
                evaluations(where: {technology_field_id: {_eq: $technology_field_id}}) {
                    technology { name } maturity_value_id
                }
            }`;
        const variables = { technology_field_id: fieldId };
        let result = client.query({query: GET_TECHNOLOGIES, variables: variables})
            .then(r => {
                console.log(r);
                return r.data.evaluations;
            });
        return result;
    }
</script>

{#if visible}
    {#await getEvaluations() then evaluations}
        {#each evaluations as evaluation}
            <p>
            Technoly yeah!
            </p>
        {/each}
    {/await}
{/if}
