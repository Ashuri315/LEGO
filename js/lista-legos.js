/* Funcion que agrega el id del lego a la ruta de la pagina */
function detalleLego(id){
    window.location.href = `detalle-productos.html?id=${id}`;
}

/* Funcion que guarda todos los legos en las cards */
    function displayLegos(data){
        $("#lego-list").html('');
        data.forEach(lego => {
            const carouselId = `carouselExample${lego.Modelo}`;
            const legoCard = `<div class="col">
                    <div class="card shadow-sm text-center lego-item">
                        <!-- Inicio Carrusel -->
                        <div id="${carouselId}" class="carousel slide">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active container-img">
                                        <img class="d-block w-100" alt="${lego.Nombre} Image" src="${lego.Img[0] ? lego.Img[0] : './img/image-not-found.jpg'}" onclick="detalleLego(${lego.Id})">

                                </div>
                                <div class="carousel-item container-img">
                                        <img class="d-block w-100" alt="${lego.Nombre} Image" src="${lego.Img[1] ? lego.Img[1] : './img/image-not-found.jpg'}" onclick="detalleLego(${lego.Id})">
          
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon bg-secondary rounded-circle" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon bg-secondary rounded-circle" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <!-- Fin carrusel -->
                       
                            <div class="card-header">
                                <h4 class="card-title title-excesive link-animation lego-name" onclick="detalleLego(${lego.Id})">${lego.Nombre}</h4>
                            </div>
                        
                        <div class="card-body">
                            <div class="d-flex justify-content-evenly">
                                <p class="card-title">Item: ${lego.Modelo}</p>
                                <p class="card-title">Review: ${lego.Calificacion ? lego.Calificacion: 'No reviews yet'}</p>
                            </div>
                            <h1 class="card-title lego-price">&dollar;${lego.Precio}</h1>
                            <div class="d-grid gap-2">
                                    <button id="cart-button" type="button" class="btn btn-lg btn-primary w-100" onclick="addToCart(${lego.Id})" data-id="">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            $('#lego-list').append(legoCard);
        });
    }

/* Funcion para mostrar las opciones de filtro por categoria */
function displayStatus(){
    var select = $('#filter');
    var Estado = [];

    /* Obtener los estado UNICOS */
    $.each(legos, function(index, lego) {
        $.each(lego.Estado, function(index, status) {
            if ($.inArray(status, Estado) === -1) {
                Estado.push(status)
                select.append('<option value="' + status + '">' + status + '</option>');
            }
        });
    });
}


    

/* Funcion que carga los legos de forma dinamica */
/* Con JQuery */
$(document).ready(function() {
    displayLegos(legos)

    /* Logica para desplegar los legocards filtrados por estado */
    displayStatus()
    $('#filter').change(function(){
        var status = $(this).val();
        var filteredLegos;
        if (status === 'all') {
            filteredLegos = legos
            
        } else {
            filteredLegos = legos.filter(function(lego) {
                return lego.Estado.includes(status);
            });
        }
        displayLegos(filteredLegos);
    })

    
});