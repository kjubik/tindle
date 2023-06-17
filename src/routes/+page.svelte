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
                <!-- <button id="search" on:click={search}>Search</button> -->
                <input type="text" bind:value={searchId} on:keypress={ handleKeyPress } placeholder="Szukaj indeksu">
            </div>
            <!-- <p class="small-text">lub</p> -->
            <div class="button">
                <a href="/results/all"><button id="see-all">Zobacz wyniki wszystkich</button></a>
            </div>
        </div>
    </div>
</main>

<style>

* {
    margin: 0;
    padding: 0;
    font-family: 'Space Grotesk', sans-serif;
}

a {
    color: inherit;
    text-decoration: none;
}

input {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

main {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 96px;
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
}

#header h1 {
    color: #FFFFFF;
    font-size: 4em;
    font-weight: 500;
}

#header h2 {
    color: #1CDDAF;
    font-size: 1em;
    font-weight: 300;
}

#actions {
    margin: 10em auto;
}

input {
    font-size: 1.5em;
    background-color: #272727;
    color: #FFFFFF;
    padding: 0.5em;
    border-radius: 0.5em;
    width: 10em;
    margin-bottom: 1em;
}

input:focus {
    outline: solid;
    outline-width: 2px;
    outline-color: #1CDDAF;
    box-shadow: 0 4px 8px rgba(28, 221, 176, 0.315);
}

.small-text {
    margin-top: 1.5em;
    color: #868686;
    font-size: 1em;
    margin-bottom: 1.5em;
}

#see-all {
    width: 14em;
    height: 2.5em;
    font-size: 1em;
    margin: 0 auto;
    background-color: transparent;
    color: #868686;
    border-radius: 0.5em;
    border: solid;
    border-width: 0.15em;
    transition: all 200ms ease-in-out;
}

#see-all:hover {
    cursor: pointer;
    border-color: #1CDDAF;
    box-shadow: 0 4px 8px rgba(28, 221, 176, 0.315);
    color: #1CDDAF;
    transition: all 200ms ease-in-out;
}

</style>
