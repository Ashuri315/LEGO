
/* Para buscar los items */
function search() {

    const searching = $('#searchInput').val().toLowerCase();
    const resultados = legos.filter(lego => lego.Nombre.toLowerCase().includes(searching));

    if (resultados == [] || resultados === 0) {
        return;
    } else {
        displayLegos(resultados)
        /* NO SIRVE */
       /*  localStorage.setItem('busqueda', JSON.stringify(resultados))
        
         window.location.href = 'https://ashuri315.github.io/LEGO/lista-productos.html';  */
    }
}