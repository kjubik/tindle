<script>
    import { onMount } from "svelte";
    import CompletedBox from "../../../components/completedBox.svelte";
    import AfterDeadlineBox from "../../../components/afterDeadlineBox.svelte";
    import NotCompletedBox from "../../../components/notCompletedBox.svelte";
    import ToDoBox from "../../../components/toDoBox.svelte";

    export let data
    let user_link = `http://bikol.vm.wmi.amu.edu.pl/dtin/results/${ data.data.indeks }`
    let user_results = []
    let tasks = []
        
    let info = {"D1":{"Deadline":"2023-06-09T16:48:52.561805174+02:00","Score":5},"D2":{"Deadline":"2023-06-09T16:48:52.561805414+02:00","Score":5},"D3":{"Deadline":"2023-06-09T16:48:52.561809834+02:00","Score":5},"D4":{"Deadline":"2023-06-09T16:48:52.561812264+02:00","Score":5},"D5":{"Deadline":"2023-06-09T16:48:52.561813624+02:00","Score":5},"D6":{"Deadline":"2023-06-09T16:48:52.561813784+02:00","Score":5},"Z2.1":{"Deadline":"2023-03-30T03:00:00+02:00","Score":2},"Z2.2":{"Deadline":"2023-03-30T03:00:00+02:00","Score":3},"Z2.3":{"Deadline":"2023-03-30T03:00:00+02:00","Score":2},"Z2.4":{"Deadline":"2023-03-30T03:00:00+02:00","Score":2},"Z2.5":{"Deadline":"2023-03-30T03:00:00+02:00","Score":3},"Z3.1":{"Deadline":"2023-04-19T03:00:00+02:00","Score":3},"Z3.2":{"Deadline":"2023-04-19T03:00:00+02:00","Score":4},"Z3.3":{"Deadline":"2023-04-19T03:00:00+02:00","Score":5},"Z5.1":{"Deadline":"2023-06-05T03:00:00+02:00","Score":4},"Z5.2":{"Deadline":"2023-06-05T03:00:00+02:00","Score":2},"Z5.3":{"Deadline":"2023-06-05T03:00:00+02:00","Score":3},"Z5.4":{"Deadline":"2023-06-05T03:00:00+02:00","Score":3},"Z6.1":{"Deadline":"2023-06-15T03:00:00+02:00","Score":4},"Z6.2":{"Deadline":"2023-06-15T03:00:00+02:00","Score":4},"Z6.3":{"Deadline":"2023-06-15T03:00:00+02:00","Score":4},"Z7.1":{"Deadline":"2023-06-26T03:00:00+02:00","Score":7}}

    onMount(async () => {
        try {
            const response = await fetch(user_link);

            if (response.ok) {
                user_results = await response.json();
                console.log(user_results)
                tasks = Object.keys(user_results.tasks).map(key => {
                    const task = user_results.tasks[key];
                    task.key = key; // Add the 'key' field to the task object

                    // Check if 'info' object has a property with the same key
                    if (info.hasOwnProperty(key)) {
                        const infoData = info[key];
                        task.Deadline = infoData.Deadline;
                        task.maxScore = infoData.Score;
                    }

                    return task;
                });

                // Include objects from 'info' that are not already in 'tasks'
                Object.keys(info).forEach(key => {
                    if (!user_results.tasks.hasOwnProperty(key)) {
                        const task = {
                            key: key,
                            Deadline: info[key].Deadline,
                            maxScore: info[key].Score,
                            score: 0,
                            time: null,
                            info: ''
                        };
                        tasks.push(task);
                    }
                });

                console.log("tasks", tasks);
            }
        } catch (error) {
            console.log(error);
        }
    });

</script>

<div class="max-w-screen-xl mx-auto content py-8 px-8">
    <div class="flex">
        <div class="left-column w-1/6">
            <div class="flex items-center justify-center w-40 mt-2 mb-4"> 
                <p class="text-3xl text-light font-light"><span class="font-semibold text-white">{ data.data.indeks }</span></p>
            </div>
            <div class="flex flex-col items-center justify-center text-center w-40 h-40 rounded-3xl border-2 border-primary-500 mb-3 glow-effect bg-gradient-to-t from-primary-900/20 to-bg shadow-inner text-lighter drop-shadow-basic">
                <h2 class="text-4xl font-bold  leading-8">
                    {#if user_results.score != null}
                        {user_results.score}
                    {:else}
                        brak
                    {/if}
                </h2>
                <p class="text-lg">
                {#if user_results.score % 1 != 0}
                    punkta
                {:else if user_results.score == 1}
                    punkt
                {:else if user_results.score >= 12 && user_results.score <= 14}
                    punktów
                {:else if user_results.score % 10 >= 2 && user_results.score % 10 <= 5} 
                    punkty 
                {:else}
                    punktów
                {/if}
                </p>
            </div>
        </div>
        <div class="right-column w-5/6 py-8 px-8 border rounded-2xl border-outline">
            <h2 class="text-2xl font-bold text-primary-500">Wyniki zadań</h2>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-left text-md font-light text-dark">
                            <thead class="border-b font-medium border-primary-500/50 text-light">
                                <tr>
                                    
                                    <th scope="col" class="px-6 py-4">Status</th>
                                    <th scope="col" class="px-6 py-4">Numer</th>
                                    <th scope="col" class="px-6 py-4">Wynik</th>
                                    <th scope="col" class="px-6 py-4">Czas oddania</th>
                                    <th scope="col" class="px-6 py-4">Termin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each tasks as task}
                                <tr class="border-b border-outline transition duration-300 ease-in-out">
                                    <td class="whitespace-nowrap pl-10 py-4 font-medium">
                                        {#if task.time != null }
                                            {#if task.time <= task.Deadline}
                                                <span class="text-green-500"><CompletedBox /></span>
                                            {:else}
                                                <span class="text-orange-500"><AfterDeadlineBox /></span>
                                            {/if}
                                        {:else}
                                            {#if new Date(task.Deadline) >= new Date()}
                                                <span class="text-blue-500"><ToDoBox /></span>
                                            {:else}
                                                <span class="text-red-500"><NotCompletedBox /></span>
                                            {/if}
                                        {/if}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">{task.key}</td>
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">{task.score} / {task.maxScore}</td>
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">
                                        {#if task.time == null}
                                            <span class="text-outline">brak</span>
                                        {:else if task.time == "1970-01-01T01:00:00+01:00"}
                                            <span class="text-dark">oddano ręcznie</span>
                                        {:else}
                                            {(new Date(task.time)).toLocaleString('pl', { dateStyle: 'medium', timeStyle: 'short' })}
                                        {/if}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">{(new Date(task.Deadline)).toLocaleString('pl', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
