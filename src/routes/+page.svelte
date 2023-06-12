<script>
    
    let searchId = ''

    function search() {
        if (searchId.split() != '') window.location.href = `/results/${searchId}`
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
                <a href="/results/all"><button>Zobacz wyniki wszystkich</button></a>
            </div>
        </div>
    </div>
</main>

<style>

main {
    width: 80%;
    margin: 0 auto;
}

</style>
