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

</script>

<div class="max-w-screen-full mx-auto py-4 px-8 text-dark">
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light ">
                    <thead class="border-b border-primary-500/50 font-medium">
                        <tr class="text-light">
                            <th scope="col" class="px-2 py-4 text-center">Indeks <button on:click={sort("student_id")} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Suma<button on:click={sort("points_total")} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">D1<button on:click={sort(`student_id`)} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">D2<button on:click={sort(`student_id`)} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">D3<button on:click={ sort('D3')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">D4<button on:click={ sort('D4')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">D5<button on:click={ sort('D5')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">D6<button on:click={ sort('D6')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z21<button on:click={ sort('Z21')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z22<button on:click={ sort('Z22')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z23<button on:click={ sort('Z23')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z24<button on:click={ sort('Z24')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z25<button on:click={ sort('Z25')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z31<button on:click={ sort('Z31')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z32<button on:click={ sort('Z32')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z33<button on:click={ sort('Z33')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z51<button on:click={ sort('Z51')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z52<button on:click={ sort('Z52')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z53<button on:click={ sort('Z53')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z54<button on:click={ sort('Z54')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z61<button on:click={ sort('Z61')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z62<button on:click={ sort('Z62')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z63<button on:click={ sort('Z63')} class="text-primary-500/30">sortuj</button></th>
                            <th scope="col" class="px-2 py-4 text-center">Z71<button on:click={ sort('Z71')} class="text-primary-500/30">sortuj</button></th>

                        </tr>
                    </thead>
                    <tbody>
                        {#each arrayAllUserResults as data}
                        <tr class="border-b border-outline transition duration-300 ease-in-out hover:bg-primary-500/10">
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center"><a href="/results/{data.student_id}" class="text-primary-500">{data.student_id}</a></td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.points_total}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.D1}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.D2}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.D3}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.D4}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.D5}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.D6}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z21}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z22}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z23}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z24}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z25}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z31}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z32}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z33}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z51}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z52}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z53}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z54}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z61}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z62}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z63}</td>
                            <td class="whitespace-nowrap py-4 font-medium border-r border-outline text-center">{data.Z71}</td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
</div>
