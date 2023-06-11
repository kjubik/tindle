<script>

    export let data

</script>

<main>

    <div class="navbar">
        <h1><a href="/">tindle</a></h1>
        <input type="text" placeholder="Wpisz indeks">
        <button>Search</button>
    <div class="content">
        <div class="left-column">
            <div class="points">
                <h2>Points</h2>
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