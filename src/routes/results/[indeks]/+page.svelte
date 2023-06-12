<script>
    import { onMount } from "svelte";

    export let data
    export let user_link = `http://bikol.vm.wmi.amu.edu.pl/dtin/results/${ data.data.indeks }`
    let base_link = "http://bikol.vm.wmi.amu.edu.pl/dtin/tasks"

    let user_results = []
    let taskKeys = []
    let tasks = []

    let base_results = []
    let baseKeys = []
    let baseTasks = []

    onMount(async () => {
        // get user results
        try {
            const response = await fetch(user_link)

            if (response.ok) {
                user_results = await response.json()
                // console.log(user_results)
                taskKeys = Object.keys(user_results.tasks);
                tasks = taskKeys.map(key => user_results.tasks[key]);
                console.log(taskKeys, tasks)
            }
        } catch (error) {
            console.log(error)
        }
    })

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
