
/* Para buscar los items */
function search(){
    /* window.location.href = 'https://example.com/nueva-pagina';
    const URLParams = new URLSearchParams(window.location.search)
    const legoId = URLParams.set("") */
    const searching = $('#searchInput').val().toLowerCase();
    const resultados = legos.filter(lego => lego.Nombre.toLowerCase().includes(searching));

    displayLegos(resultados) 
    $('#filter').val('')
}