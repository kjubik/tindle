<script>
    import { onMount } from "svelte";

    let link = 'http://bikol.vm.wmi.amu.edu.pl/dtin/results'
    
    let results = []
    let jsonArray = []
    let mappedTasks = []
    let mappedTasksCopy = []
    let thisIsGettingOutOfHand = []

    onMount(async () => {
        try {
            const response = await fetch(link)

            if (response.ok) {
                results = await response.json()

                // Convert the JSON object to an array of objects
                jsonArray = Object.entries(results).map(([id, data]) => ({ id, ...data }));

                mappedTasks = jsonArray.map((obj) => {
                    const { tasks, ...rest } = obj;
                    const mappedTasks = [];

                    for (const taskKey in tasks) {
                        if (tasks.hasOwnProperty(taskKey)) {
                        const task = { task_id: taskKey, ...tasks[taskKey] };
                        mappedTasks.push(task);
                        }
                    }

                    return { ...rest, tasks: mappedTasks };
                });

                mappedTasksCopy = mappedTasks
                console.log(mappedTasksCopy)
                mappedTasksCopy.forEach(item => {
                    item.tasks.forEach(task => {
                        task.id = item.id
                    })
                })

                thisIsGettingOutOfHand = mappedTasksCopy.flatMap(item => item.tasks);
                console.log(thisIsGettingOutOfHand)
                
                // data.forEach(item => {
                //     item.tasks.forEach(task => {
                //         task.id = item.id;
                //     });
                // });
            }
        } catch (error) {
            console.log(error)
        }
    })

    // sortowanie tabeli
    // https://svelte.dev/repl/08aca4e5d75e4ba7b8b05680f3d3bf7a?version=3.23.1

    // Holds table sort state.  Initialized to reflect table sorted by id column ascending.
	let sortBy = {col: "id", ascending: true};
	
	$: sort1 = (column) => {
		
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
		
		mappedTasks = mappedTasks.sort(sort);
	}

    $: sort2 = (column) => {
		
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
		
		thisIsGettingOutOfHand = thisIsGettingOutOfHand.sort(sort);
	}

</script>

<main>
    <h1><a href="/">tindle</a></h1>

    <table style="float: left;">
        <thead>
            <tr>
            <th on:click={sort1("id")}>Indeks</th>
            <th on:click={sort1("score")}>Suma</th>
            </tr>
        </thead>
        <tbody>
            {#each mappedTasks as obj}
                <tr>
                <td ><a href="/results/{obj.id}">{obj.id}</a></td>
                <td>{obj.score}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <table style="float: left; margin-left: 64px">
        <thead>
            <tr>
            <th on:click={ sort2("id") }>Indeks</th>
            <th on:click={ sort2("task_id") }>Task Number</th>
            <th on:click={ sort2("score") }>Score</th>
            </tr>
        </thead>
        <tbody>
            {#each thisIsGettingOutOfHand as task_result}
            <tr>
                <td><a href="/results/{task_result.id}">{task_result.id}</a></td>
                <td>{task_result.task_id}</td>
                <td>{task_result.score}</td>
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