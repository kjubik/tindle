<script>
    import { onMount } from "svelte";

    export let data
    
    export let link = `http://bikol.vm.wmi.amu.edu.pl/dtin/results/${ data.data.indeks }`

    let list = []

    onMount(async () => {
        const response = await fetch(link)
        list = await response.json()
        console.log(list)
    })
</script>

<main>

    <div class="navbar">
        <h1><a href="/">tindle</a></h1>
        <input type="text" placeholder="Wpisz indeks">
        <button>Search</button>
    <div class="content">
        <div class="left-column">
            <div class="points">
                <h2>{list.score} punkty</h2>
            </div>
            <div class="indeks">
                <p>indeks <span>{ data.data.indeks }</span></p>
            </div>
        </div>
        <div class="right-column">
            <div class="tasks">
                <h2>Wszystkie wyniki</h2>
            </div>
        </div>
    </div>
</main>