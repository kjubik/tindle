<script>
    import { onMount } from "svelte";
    import Icon from '@iconify/svelte';

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

<div class="max-w-screen-xl mx-auto py-4 px-8 text-dark">

    <button on:click={() => handleTabClick(0)} class=" text-white font-semibold py-2 px-4 rounded-lg mr-2 {tabId == 0 ? 'bg-primary-900' : 'bg-bg outline outline-1 outline-outline'}">Moduł 2</button>
    <button on:click={() => handleTabClick(1)} class=" text-white font-semibold py-2 px-4 rounded-lg mr-2 {tabId == 1 ? 'bg-primary-900' : 'bg-bg outline outline-1 outline-outline'}">Moduł 3</button>
    <button on:click={() => handleTabClick(2)} class=" text-white font-semibold py-2 px-4 rounded-lg mr-2 {tabId == 2 ? 'bg-primary-900' : 'bg-bg outline outline-1 outline-outline'}">Moduł 5</button>
    <button on:click={() => handleTabClick(3)} class=" text-white font-semibold py-2 px-4 rounded-lg mr-2 {tabId == 3 ? 'bg-primary-900' : 'bg-bg outline outline-1 outline-outline'}">Moduły 6, 7</button>
    <button on:click={() => handleTabClick(4)} class=" text-white font-semibold py-2 px-4 rounded-lg mr-2 {tabId == 4 ? 'bg-primary-900' : 'bg-bg outline outline-1 outline-outline'}">Dodatkowe</button>

    <div class="flex flex-col border rounded-2xl border-outline px-12 mt-4">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full text-left text-md font-light text-dark">
                        <thead class="border-b font-medium border-primary-500/50 text-light">
                            <tr class="">
                                <th scope="col" class="px-10 py-4">Indeks<button on:click={sort("student_id")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                <th scope="col" class="px-10 py-4">Suma<button on:click={sort("points_total")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                {#if tabId === 0} <!-- Moduł 2 -->
                                    <th scope="col" class="px-10 py-4">2.1<button on:click={sort("Z21")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">2.2<button on:click={sort("Z22")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">2.3<button on:click={sort("Z23")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">2.4<button on:click={sort("Z24")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">2.5<button on:click={sort("Z25")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                {:else if tabId === 1} <!-- Moduł 3 -->
                                    <th scope="col" class="px-10 py-4">3.1<button on:click={sort("Z31")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">3.2<button on:click={sort("Z32")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">3.3<button on:click={sort("Z33")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                {:else if tabId === 2} <!-- Moduł 5 -->
                                    <th scope="col" class="px-10 py-4">5.1<button on:click={sort("Z51")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">5.2<button on:click={sort("Z52")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">5.3<button on:click={sort("Z53")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">5.4<button on:click={sort("Z54")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                {:else if tabId === 3} <!-- Moduły 6, 7 -->
                                    <th scope="col" class="px-10 py-4">6.1<button on:click={sort("Z61")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">6.2<button on:click={sort("Z62")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">6.3<button on:click={sort("Z63")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">7.1<button on:click={sort("Z71")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                {:else} <!-- Dodatkowe -->
                                    <th scope="col" class="px-10 py-4">D1<button on:click={sort("D1")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">D2<button on:click={sort("D2")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">D3<button on:click={sort("D3")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">D4<button on:click={sort("D4")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">D5<button on:click={sort("D5")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                    <th scope="col" class="px-10 py-4">D6<button on:click={sort("D6")}><Icon icon="pepicons-pop:sort" class="text-dark pl-2 text-2xl inline pb-1"/></button></th>
                                {/if}
                            </tr>
                        </thead>
                        <tbody class="">
                            {#each arrayAllUserResults as data}
                                <tr class="border-b border-outline last:border-bg  transition duration-300 ease-in-out hover:text-lighter hover:bg-outline">
                                    <td class="whitespace-nowrap pl-10 py-4 font-medium"><a href="/results/{data.student_id}" class="text-primary-500">{data.student_id}</a></td>
                                    <td class="whitespace-nowrap pl-10 py-4 font-medium">{data.points_total}</td>
                                    {#if tabId === 0} <!-- Moduł 2 -->
                                        <td class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z21}</td>
                                        <td class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z22}</td>
                                        <td class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z23}</td>
                                        <td class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z24}</td>
                                        <td class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z25}</td>
                                    {:else if tabId === 1} <!-- Moduł 3 -->
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z31}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z32}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z33}</td>
                                    {:else if tabId === 2} <!-- Moduł 5 -->
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z51}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z52}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z53}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z54}</td>
                                    {:else if tabId === 3} <!-- Moduły 6, 7 -->
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z61}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z62}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z63}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.Z71}</td>
                                    {:else} <!-- Dodatkowe -->
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.D1}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.D2}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.D3}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.D4}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.D5}</td>
                                        <td  class="whitespace-nowrap pl-10 py-4 font-medium">{data.D6}</td>
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
