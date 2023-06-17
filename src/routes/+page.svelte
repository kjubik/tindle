<script>

    let searchId = ''
    function search() {
        if (searchId.split() != '') window.location.href = `/results/${searchId}`
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') search()
    }

</script>

<main class="container mx-auto px-4 py-32 select-none">
    <div id="header" class="text-center">
        <h1 class="text-6xl font-bold text-dark">tindle</h1>
        <h2 class="text-xl text-primary-700">interfejs wyników z Technologii internetowych</h2>
    </div>

    <div id="actions" class="mt-16 flex flex-col items-center">
        <div class="search-bar mb-4">
            <input type="text" bind:value={searchId} on:keypress={handleKeyPress} placeholder="Szukaj indeksu" 
                class="font-semibold border border-gray-300 px-4 py-2 rounded-md w-64 focus:outline-none focus:border-white focus:ring-2 focus:ring-primary-600 focus:drop-shadow-[0_2px_4px_rgba(28,221,175,0.25)]">
            <!-- <button on:click={search} class="ml-4 bg-primary-600 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded">Search</button> -->
        </div>
        <p class="text-gray-400 text-center mb-4">lub</p>
        <div class="button">
            <a href="/results/all" class="bg-primary-600 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded">Zobacz wyniki wszystkich</a>
        </div>
    </div>

    <!-- https://tailwindcss.com/
    https://svelte.dev/ -->
</main>
