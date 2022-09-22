<script>
    import {Icon, Input, InputGroup, InputGroupText} from 'sveltestrap';
    import {gql} from "@apollo/client";
    import {getContext, setContext} from "svelte";
    import {fieldIdWritable} from "./global";

    const client = getContext('graphql-client');

    const FIELDS = gql`query { technology_fields { id name description } }`;
    const fieldsQuery = client.query({ query: FIELDS }).then(r => r.data.technology_fields);

    let selected = 1;

    $: update(selected);
    function update(id) {
        fieldIdWritable.set(id);
    }
</script>

<InputGroup>
    <InputGroupText><Icon name="bag" /></InputGroupText>
    <Input bind:value={selected} type="select">
        {#await fieldsQuery then fields}
            {#each fields as field}
                <option value={field.id}>{field.name}</option>
            {/each}
        {/await}
    </Input>
</InputGroup>
