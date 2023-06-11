<script>
    
    let searchId = ''

    function search() {
        window.location.href = `/results/${searchId}`
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') search()
    }

</script>

<main>
    <div class="container">
        <div id="header">
            <h1><a href="/">tindle</a></h1>
            <h2>interfejs wyników z Technologii internetowych</h2>
        </div>

        <div id="actions">
            <div class="search-bar">
                <input type="text" bind:value={searchId} on:keypress={ handleKeyPress } placeholder="Wpisz indeks">
                <button on:click={search}>Search</button>
            </div>
            <p class="small-text">lub</p>
            <div class="button">
                <button>Zobacz wyniki wszystkich</button>
            </div>
        </div>
    </div>
</main>

<style>

</style>
