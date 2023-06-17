<script>
    import { onMount } from "svelte";

    let link = 'http://bikol.vm.wmi.amu.edu.pl/dtin/results'
    let info_link = 'http://bikol.vm.wmi.amu.edu.pl/dtin/tasks'
    
    let results = []
    let arrayUsersTaskScores = []
    let arrayAllTasksSpec = []
    let arrayAllUserResults = []

    onMount(async () => {
        try {
            const info_response = await fetch(info_link)

            if (info_response.ok) {
                results = await info_response.json()
                Object.entries(results).forEach(([id, data]) => {
                    arrayAllTasksSpec.push({
                        task_id: id,
                        deadline: data.Deadline,
                        max_score: data.Score
                    })
                })
                console.log("all tasks specification", arrayAllTasksSpec)
            }

            const user_data_response = await fetch(link)
            //const second_response = await fetch(info_link)

            if (user_data_response.ok) {
                results = await user_data_response.json()
                console.log("results of response.json", results)
            }
            
            Object.entries(results).forEach(student => {
                const [student_id, all_student_data] = student
                let task_scores = []
                let task_index = 0

                Object.entries(all_student_data.tasks).forEach(task => {
                    const [task_id, task_data] = task
                    // var elementPos = array.map(function(x) {return x.id; }).indexOf(idYourAreLookingFor);
                    // var objectFound = array[elementPos];

                    task_index = arrayAllTasksSpec.map(function(x) {return x.task_id}).indexOf(task_id)
                    task_scores[task_index] = task_data.score
                })

                for (task_index = 0; task_index < arrayAllTasksSpec.length; task_index++) {
                    if (task_scores[task_index] === undefined) task_scores[task_index] = 0
                }

                arrayAllUserResults.push({
                    student_id: student_id,
                    points_total: all_student_data.score,
                    task_scores: task_scores
                })
            })

            console.log("all user results", arrayAllUserResults)
            arrayAllUserResults = arrayAllUserResults
            arrayAllTasksSpec = arrayAllTasksSpec
        } catch (error) {
            console.log(error)
        }
    })

    // sortowanie tabeli
    // https://svelte.dev/repl/08aca4e5d75e4ba7b8b05680f3d3bf7a?version=3.23.1

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
		
		arrayAllUserResults = arrayAllUserResults.sort(sort);
	}

    console.log("bober", arrayAllTasksSpec)

</script>

<main>
    <h1><a href="/">tindle</a></h1>

    <table style="float: left; margin-left: 64px">
        <thead>
            <tr>
            <th>Indeks <button on:click={sort("student_id")}>sortuj</button></th>
            <th>Suma punktów<button on:click={sort("points_total")}>sortuj</button></th>
            {#each arrayAllTasksSpec as task_spec, i}
            <th>{task_spec.task_id} <button on:click={sort(`task_scores[${i}]`)}>sortuj</button></th>
            {/each}
            </tr>
        </thead>
        <tbody>
            {#each arrayAllUserResults as data}
            <tr>
                <td><a href="/results/{data.student_id}">{data.student_id}</a></td>
                <td>{data.points_total}</td>
                {#each data.task_scores as score}
                <td>{score}</td>
                {/each}
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