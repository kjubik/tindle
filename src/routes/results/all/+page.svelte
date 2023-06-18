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

</script>

<div class="max-w-screen-full mx-auto py-4 px-8 text-dark">
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                    <thead class="border-b font-medium">
                        <tr>
                            <th scope="col" class="px-2 py-4 border-r text-center">Indeks <button on:click={sort("student_id")} class="text-blue-500">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 border-r text-center">Suma<button on:click={sort("points_total")} class="text-blue-500">sortuj</button></th>
                            {#each arrayAllTasksSpec as task_spec, i}
                            <th scope="col" class="px-2 py-4 border-r text-center">{task_spec.task_id} <button on:click={sort(`task_scores[${i}]`)} class="text-blue-500">sortuj</button></th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#each arrayAllUserResults as data}
                        <tr class="border-b transition duration-300 ease-in-out hover:bg-primary-500/10">
                            <td class="whitespace-nowrap py-4 font-medium border-r text-center"><a href="/results/{data.student_id}" class="text-blue-500">{data.student_id}</a></td>
                            <td class="whitespace-nowrap py-4 font-medium border-r text-center">{data.points_total}</td>
                            {#each data.task_scores as score}
                            <td class="whitespace-nowrap py-4 font-medium border-r text-center">{score}</td>
                            {/each}
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
</div>
