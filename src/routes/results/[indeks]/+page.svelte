<script>
    import { onMount } from "svelte";

    export let data
    export let user_link = `http://bikol.vm.wmi.amu.edu.pl/dtin/results/${ data.data.indeks }`
    let user_results = []
    let taskKeys = []
    let tasks = []
    
    let info = {"D1":{"Deadline":"2023-06-09T16:48:52.561805174+02:00","Score":5},"D2":{"Deadline":"2023-06-09T16:48:52.561805414+02:00","Score":5},"D3":{"Deadline":"2023-06-09T16:48:52.561809834+02:00","Score":5},"D4":{"Deadline":"2023-06-09T16:48:52.561812264+02:00","Score":5},"D5":{"Deadline":"2023-06-09T16:48:52.561813624+02:00","Score":5},"D6":{"Deadline":"2023-06-09T16:48:52.561813784+02:00","Score":5},"Z2.1":{"Deadline":"2023-03-30T03:00:00+02:00","Score":2},"Z2.2":{"Deadline":"2023-03-30T03:00:00+02:00","Score":3},"Z2.3":{"Deadline":"2023-03-30T03:00:00+02:00","Score":2},"Z2.4":{"Deadline":"2023-03-30T03:00:00+02:00","Score":2},"Z2.5":{"Deadline":"2023-03-30T03:00:00+02:00","Score":3},"Z3.1":{"Deadline":"2023-04-19T03:00:00+02:00","Score":3},"Z3.2":{"Deadline":"2023-04-19T03:00:00+02:00","Score":4},"Z3.3":{"Deadline":"2023-04-19T03:00:00+02:00","Score":5},"Z5.1":{"Deadline":"2023-06-05T03:00:00+02:00","Score":4},"Z5.2":{"Deadline":"2023-06-05T03:00:00+02:00","Score":2},"Z5.3":{"Deadline":"2023-06-05T03:00:00+02:00","Score":3},"Z5.4":{"Deadline":"2023-06-05T03:00:00+02:00","Score":3},"Z6.1":{"Deadline":"2023-06-15T03:00:00+02:00","Score":4},"Z6.2":{"Deadline":"2023-06-15T03:00:00+02:00","Score":4},"Z6.3":{"Deadline":"2023-06-15T03:00:00+02:00","Score":4},"Z7.1":{"Deadline":"2023-06-26T03:00:00+02:00","Score":7}}

    onMount(async () => {
        try {
            const response = await fetch(user_link)

            if (response.ok) {
                user_results = await response.json()
                taskKeys = Object.keys(user_results.tasks);
                tasks = taskKeys.map(key => user_results.tasks[key]);
                console.log(taskKeys, tasks)
            }
        } catch (error) {
            console.log(error)
        }
    })

    function matchPayloads(payload1, payload2) {
        const matchedPayload = {};

        // Matching Z2.x tasks
        for (const task in payload1.tasks) {
            if (payload2.hasOwnProperty(task)) {
            matchedPayload[task] = {
                time: payload1.tasks[task].time,
                score1: payload1.tasks[task].score,
                info1: payload1.tasks[task].info,
                deadline: payload2[task].Deadline,
                score2: payload2[task].Score
            };
            }
        }

        return matchedPayload;
        }

    // search bar logic

    let searchId = ''

    function search() {
        window.location.href = `/results/${searchId}`
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') search()
    }

</script>

<main>
    <div class="navbar">
        <h1><a href="/">tindle</a></h1>
        <input type="text" bind:value={searchId} on:keypress={ handleKeyPress } placeholder="Wpisz indeks">
        <button on:click={search}>Search</button>
    <div class="content">
        <div class="left-column">
            <div class="points">
                <h2>{user_results.score} punkty</h2>
            </div>
            <div class="indeks">
                <p>indeks <span>{ data.data.indeks }</span></p>
            </div>
        </div>
        <div class="right-column">
            <div class="tasks">
                <h2>Wyniki zadań</h2>
                
                <table>
                    <thead>
                    <tr>
                        <th>Numer</th>
                        <th>Wynik</th>
                        <th>Czas</th>
                    </tr>
                    </thead>
                    <tbody>
                        {#each tasks as task, i}
                        <tr>
                                <td>{taskKeys[i]}</td>
                                <td>{task.score}</td>
                                <td>{(new Date(task.time)).toLocaleString('pl', { dateStyle: 'long', timeStyle: 'short' })}</td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
