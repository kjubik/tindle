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
                    D1: task_scores[0],
                    D2: task_scores[1],
                    D3: task_scores[2],
                    D4: task_scores[3],
                    D5: task_scores[4],
                    D6: task_scores[5],
                    Z21: task_scores[6],
                    Z22: task_scores[7],
                    Z23: task_scores[8],
                    Z24: task_scores[9],
                    Z25: task_scores[10],
                    Z31: task_scores[11],
                    Z32: task_scores[12],
                    Z33: task_scores[13],
                    Z51: task_scores[14],
                    Z52: task_scores[15],
                    Z53: task_scores[16],
                    Z54: task_scores[17],
                    Z61: task_scores[18],
                    Z62: task_scores[19],
                    Z63: task_scores[20],
                    Z71: task_scores[21],
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

    let sortBy = {col: "id", ascending: false};
	
	$: sort = (column) => {
		
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = false
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

    // dane do html

    let tabId = 0;

    function handleTabClick(selectedTab) {
    tabId = selectedTab;
  }

</script>


<button on:click={() => handleTabClick(0)}>Moduł 2</button>
<button on:click={() => handleTabClick(1)}>Moduł 3</button>
<button on:click={() => handleTabClick(2)}>Moduł 5</button>
<button on:click={() => handleTabClick(3)}>Moduły 6, 7</button>
<button on:click={() => handleTabClick(4)}>Dodatkowe</button>

<div class="max-w-screen-full mx-auto py-4 px-8 text-dark">
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="">
                        <thead class="">
                            <tr class="">
                                <th>Indeks</th>
                                <th>Suma</th>
                                {#if tabId === 0} <!-- Moduł 2 -->
                                    <th>2.1</th>
                                    <th>2.2</th>
                                    <th>2.3</th>
                                    <th>2.4</th>
                                    <th>2.5</th>
                                {:else if tabId === 1} <!-- Moduł 3 -->
                                    <th>3.1</th>
                                    <th>3.2</th>
                                    <th>3.3</th>
                                {:else if tabId === 2} <!-- Moduł 5 -->
                                    <th>5.1</th>
                                    <th>5.2</th>
                                    <th>5.3</th>
                                    <th>5.4</th>
                                {:else if tabId === 3} <!-- Moduły 6, 7 -->
                                    <th>6.1</th>
                                    <th>6.2</th>
                                    <th>6.3</th>
                                    <th>7.1</th>
                                {:else} <!-- Dodatkowe -->
                                    <th>D1</th>
                                    <th>D2</th>
                                    <th>D3</th>
                                    <th>D4</th>
                                    <th>D5</th>
                                    <th>D6</th>
                                {/if}
                            </tr>
                        </thead>
                        <tbody class="">
                            {#each arrayAllUserResults as data}
                                <tr>
                                    <td><a href="/results/{data.student_id}" class="text-primary-500">{data.student_id}</a></td>
                                    <td>{data.points_total}</td>
                                    {#if tabId === 0} <!-- Moduł 2 -->
                                        <td>{data.Z21}</td>
                                        <td>{data.Z22}</td>
                                        <td>{data.Z23}</td>
                                        <td>{data.Z24}</td>
                                        <td>{data.Z25}</td>
                                    {:else if tabId === 1} <!-- Moduł 3 -->
                                        <td>{data.Z31}</td>
                                        <td>{data.Z32}</td>
                                        <td>{data.Z33}</td>
                                    {:else if tabId === 2} <!-- Moduł 5 -->
                                        <td>{data.Z51}</td>
                                        <td>{data.Z52}</td>
                                        <td>{data.Z53}</td>
                                        <td>{data.Z54}</td>
                                    {:else if tabId === 3} <!-- Moduły 6, 7 -->
                                        <td>{data.Z61}</td>
                                        <td>{data.Z62}</td>
                                        <td>{data.Z63}</td>
                                        <td>{data.Z71}</td>
                                    {:else} <!-- Dodatkowe -->
                                        <td>{data.D1}</td>
                                        <td>{data.D2}</td>
                                        <td>{data.D3}</td>
                                        <td>{data.D4}</td>
                                        <td>{data.D5}</td>
                                        <td>{data.D6}</td>
                                    {/if}
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
