<script>
    import { onMount } from "svelte";

    let link = 'http://bikol.vm.wmi.amu.edu.pl/dtin/results'
    
    let results = []
    let formatedData = []

    onMount(async () => {
        try {
            const response = await fetch(link)

            if (response.ok) {
                results = await response.json()
                console.log("results of response.json", results)
            }
        } catch (error) {
            console.log(error)
        }
    })

    $: {
        formatedData = [];
        Object.entries(results).forEach(([id, data]) => {
        Object.entries(data.tasks).forEach(([taskId, taskData]) => {
            formatedData.push({
            id: parseInt(id),
            task_id: taskId,
            time: taskData.time,
            score: taskData.score,
            info: taskData.info
            });
        });
        });
    }

    // sortowanie tabeli
    // https://svelte.dev/repl/08aca4e5d75e4ba7b8b05680f3d3bf7a?version=3.23.1

</script>

<main>
    <h1><a href="/">tindle</a></h1>

    <table style="float: left;">
        <thead>
            <tr>
            <th>Indeks</th>
            <th>Suma</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td ><a href="/results/[indeks]">#</a></td>
            <td></td>
            </tr>
        </tbody>
    </table>

    <table style="float: left; margin-left: 64px">
        <thead>
            <tr>
            <th>Indeks</th>
            <th>Task Number</th>
            <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {#each formatedData as data}
                <tr>
                <td><a href="/results/{data.id}">{data.id}</a></td>
                <td>{data.task_id}</td>
                <td>{data.score}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>
  
<style>

table {
    width: 20%;
    margin: 0 auto;
    margin-bottom: 64px;
    border-collapse: collapse;
}

th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

</style>