export async function load({params}) {
    const indeks = params.indeks;

    return {
        data: {
            indeks
        }
    }
}