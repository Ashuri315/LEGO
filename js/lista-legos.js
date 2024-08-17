/* Funcion que agrega el id del lego a la ruta de la pagina */
function detalleLego(id){
    window.location.href = `detalle-lego.html?=${id}`;
}

/* Funcion que guarda todos los legos en las cards */
/* function displayLegos(data){
    $("#lego-list").html('')
    data.forEach(lego => {
        const carouselId = `carouselExample${lego.id}`;
        const legoCard =`<div class="col">
                <div class="card shadow-sm text-center">
                    <!-- Inicio Carrusel -->
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="0"
                                class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <a href="detalleLego(${lego.Id})">
                                    <img class="d-block w-100" alt="${lego.Nombre} Image" src="${lego.Img[0] ? lego.Img: './img/image-not-found.jpg'}">
                                </a>
                            </div>

                            <div class="carousel-item">
                                <a href="detalleLego(${lego.Id})">
                                    <img class="d-block w-100" alt="${lego.Nombre} Image" src="${lego.Img[1] ? lego.Img: './img/image-not-found.jpg'}">
                                </a>
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
                    <a class="link-animation" href="detalleLego(${lego.Id})">
                        <div class="card-header">
                            <h4 class="card-title">${lego.Nombre}</h4>
                        </div>
                    </a>

                    <div class="card-body">
                        <div class="d-flex justify-content-evenly">
                            <p class="card-title">Item: ${lego.Id}</p>
                            <p class="card-title">Review: ${lego.Calificacion} </p>
                        </div>


                        <h1 class="card-title">&dollar;${lego.Precio}</h1>

                        <div class="d-grid gap-2">
                            <a href="">
                                <button type="button" class="btn btn-lg btn-primary" onclick="detalleLego(${lego.Id})">Add to cart</button>
                            </a>

                        </div>

                    </div>
                </div>
            </div>`
            $('#lego-list').append(legoCard)
        
    });
} */

    function displayLegos(data){
        $("#lego-list").html('');
        data.forEach(lego => {
            const carouselId = `carouselExample${lego.Modelo}`;
            const legoCard = `<div class="col">
                    <div class="card shadow-sm text-center">
                        <!-- Inicio Carrusel -->
                        <div id="${carouselId}" class="carousel slide">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <a href="detalleLego(${lego.id})">
                                        <img class="d-block w-100" alt="${lego.Nombre} Image" src="${lego.Img[0] ? lego.Img[0] : './img/image-not-found.jpg'}">
                                    </a>
                                </div>
                                <div class="carousel-item">
                                    <a href="detalleLego(${lego.id})">
                                        <img class="d-block w-100" alt="${lego.Nombre} Image" src="${lego.Img[1] ? lego.Img[1] : './img/image-not-found.jpg'}">
                                    </a>
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
                        <a class="link-animation" href="detalleLego(${lego.id})">
                            <div class="card-header">
                                <h4 class="card-title">${lego.Nombre}</h4>
                            </div>
                        </a>
                        <div class="card-body">
                            <div class="d-flex justify-content-evenly">
                                <p class="card-title">Item: ${lego.Modelo}</p>
                                <p class="card-title">Review: ${lego.Calificacion}</p>
                            </div>
                            <h1 class="card-title">$${lego.Precio}</h1>
                            <div class="d-grid gap-2">
                                <a href="">
                                    <button type="button" class="btn btn-lg btn-primary" onclick="detalleLego(${lego.id})">Add to cart</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;
            $('#lego-list').append(legoCard);
        });
    }
    

/* Funcion que carga los legos de forma dinamica */
/* Con JQuery */
$(document).ready(function() {
    displayLegos(legos)
});