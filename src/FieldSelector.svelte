<script>
    import {Icon, Input, InputGroup, InputGroupText} from 'sveltestrap';
    import {gql} from "@apollo/client";
    import {getContext} from "svelte";

    const client = getContext('graphql-client');

    console.log(client);
    const FIELDS = gql`query { technology_fields { id name description } }`;
    const fieldsQuery = client.query({ query: FIELDS }).then(r => r.data.technology_fields);
</script>

<InputGroup>
    <InputGroupText><Icon name="bag" /></InputGroupText>
    <Input type="select">
        {#await fieldsQuery then fields}
            {#each fields as field}
                <option>{field.name}</option>
            {/each}
        {/await}
    </Input>
</InputGroup>
