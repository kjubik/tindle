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

* {
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

main {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 96px;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    align-items: flex-end;
    height: 100%;
}

#header h1 {
    color: #FFFFFF;
    font-size: 48px;
    font-weight: 700;
}

#header h2 {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 300;
}

#actions {
    margin: auto;
}


</style>
