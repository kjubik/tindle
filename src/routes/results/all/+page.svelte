<script>
    import { onMount } from "svelte";
    import Icon from '@iconify/svelte';

    let link = 'http://bikol.vm.wmi.amu.edu.pl/dtin/results'
    let info_link = 'http://bikol.vm.wmi.amu.edu.pl/dtin/tasks'
    
    let results = []
    let arrayUsersTaskScores = []
    let arrayAllTasksSpec = []
    let arrayAllUserResults = []

    let loaded = false;

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

            loaded = true
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
    {#if loaded}
    
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

    {:else}

    <div class="w-full text-center pt-12">
        <div role="status">
            <svg aria-hidden="true" class="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>

    {/if}
</div>
