<script>
    import { onMount } from "svelte";

    let link = 'http://bikol.vm.wmi.amu.edu.pl/dtin/results'
    let object = {}
    let results = []

    onMount(async () => {
        try {
            const response = await fetch(link)

            if (response.ok) {
                results = await response.json()
                console.log(results)
                // var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
                // var result = Object.keys(obj).map((key) => [key, obj[key]]);
            }
        } catch (error) {
            console.log(error)
        }
    })

    // sortowanie tabeli
    // https://svelte.dev/repl/08aca4e5d75e4ba7b8b05680f3d3bf7a?version=3.23.1

    // Holds table sort state.  Initialized to reflect table sorted by id column ascending.
	let sortBy = {col: "id", ascending: true};
	
	$: sort = (column) => {
		
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = true
		}
		
		// Modifier to sorting function for ascending or descending
		let sortModifier = (sortBy.ascending) ? 1 : -1;
		
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
		
		array = array.sort(sort);
	}

</script>

<main>
    <h1><a href="/">tindle</a></h1>

    <table style="float: left;">
        <thead>
            <tr>
            <th on:click={ null }>Indeks</th>
            <th>Suma</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(results) as [indeks, { score }]}
                <tr>
                <td><a href="/results/{indeks}">{indeks}</a></td>
                <td>{score}</td>
                </tr>
            {/each}
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
            {#each Object.entries(results) as [indeks, { tasks }]}
            {#each Object.entries(tasks) as [taskNumber, { score }]}
                <tr>
                <td><a href="/results/{indeks}">{indeks}</a></td>
                <td>{taskNumber}</td>
                <td>{score}</td>
                </tr>
            {/each}
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