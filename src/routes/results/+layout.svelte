<script>
    import AfterDeadlineBox from "../../components/afterDeadlineBox.svelte";
    import CompletedBox from "../../components/completedBox.svelte";
    import NotCompletedBox from "../../components/notCompletedBox.svelte";
    import ToDoBox from "../../components/toDoBox.svelte";

    // search bar logic
    let searchId = ''
    function search() {
        if (searchId.split() != '') window.location.href = `/results/${searchId}`
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') search()
    }

</script>

<main>
    <div class="navbar bg-bg text-white sticky top-0 z-10">
        <div class="max-w-screen-xl mx-auto py-4 px-8 flex items-center justify-between">
            <h1><a href="/" class="text-xl font-bold">tindle</a></h1>
            <div class="flex items-center">
                <input type="text" bind:value={searchId} on:keypress={handleKeyPress} placeholder="Szukaj indeksu" 
                class="font-standard bg-outline caret-white placeholder:text-dark placeholder:font-standard text-white px-4 py-2 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-primary-600 hover:drop-shadow-clickme focus:drop-shadow-basic">
                <a href="/results/all" class="ml-4 bg-primary-900 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg">Zobacz wyniki wszystkich</a>
            </div>
        </div>
    </div>
    <slot />
</main>