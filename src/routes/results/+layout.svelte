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
    <div class="navbar bg-primary-600 text-white sticky top-0 z-10">
        <div class="max-w-screen-2xl mx-auto py-4 px-8 flex items-center justify-between">
            <h1><a href="/" class="text-xl font-bold">tindle</a></h1>
            <div class="flex items-center">
                <input type="text" bind:value={searchId} on:keypress={handleKeyPress} placeholder="Wpisz indeks" class="text-dark font-semibold border border-gray-300 px-4 py-2 rounded-md focus:outline-none">
                <a href="/results/all" class="ml-4 bg-primary-700 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded">Zobacz wyniki wszystkich</a>
            </div>
        </div>
    </div>
    <slot />
</main>