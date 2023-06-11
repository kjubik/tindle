<script>
    import { onMount } from "svelte";
    
    export let link = "";

    let list = []

    onMount(async () => {
        const response = await fetch(link)
        list = await response.json()
        console.log(list)
    })
</script>

<div>
    <p>{ list.score }</p>
</div>