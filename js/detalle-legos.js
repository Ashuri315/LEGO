/* Obtiene el Id desde la URL */
$(document).ready(function () {
    const URLParams = new URLSearchParams(window.location.search)
    const legoId = URLParams.get("id")
    if (legoId) {
        /* Muestra los detalles del lego */
        console.log(`Detalles del lego con Id: ${legoId}`);
        const lego = legos.find((l) => l.Id == legoId)
        if (lego) {
            console.table(lego)

            /* Imagenes */
            $("#img1").attr('src', lego.Img[0])
            $("#img2").attr('src', lego.Img[1])

            /* Status */
            $("#status").html('')
            lego.Estado.forEach(estados => {
                const estadoLego = document.createElement("span")
                estadoLego.classList.add("text-bg-danger", "p-2")
                estadoLego.textContent = estados
                $("#status").append(estadoLego)
            })

            /* Estrellas calificacion */
            $("#rating-container").html('')
            function generateStars(rating) {
                var fullStar = Math.floor(rating)
                var halfStar = (rating % 1) >= 0.5 ? 1 : 0;
                var starsHtml = ''

                for (var i = 0; i < fullStar; i++) {
                    starsHtml += ' <i class="fa-solid fa-star fa-xl" style="color: #FFD43B;"></i>'; // Estrella completa
                }
                if (halfStar) {
                    starsHtml += '<i class="fa-regular fa-star-half-stroke fa-xl" style="color: #FFD43B;"></i>'; // Media estrella
                }
                return starsHtml;
            }
            var stars = generateStars(lego.Calificacion)
            $("#rating-container").append(stars)
            var calification = `<b id="Calification">${lego.Calificacion ? lego.Calificacion: 'No reviews yet'}</b>`
            $("#rating-container").append(calification)

            $("#Name").text(lego.Nombre)
            $("#Category").text(lego.Categoria)
            $("#price").html("&dollar;" + lego.Precio)


            /* Funciones y codigo para el contador INICIO*/
            var limit = lego.Cantidad;
            function updateButtons(counter) {
                if (counter <= 1) {
                    $("#decrement").prop("disabled", true);
                } else {
                    $("#decrement").prop("disabled", false);
                }
                if (counter >= limit) {
                    $("#increment").prop("disabled", true);
                } else {
                    $("#increment").prop("disabled", false);
                }
            }
            $("#increment").click(function () {
                var counter = parseInt($("#counter").val());
                if (counter < limit) {
                    counter++;
                    $("#counter").val(counter);
                    updateButtons(counter);
                }
            });
            $("#decrement").click(function () {
                var counter = parseInt($("#counter").val());
                if (counter > 1) {
                    counter--;
                    $("#counter").val(counter);
                    updateButtons(counter);
                }
            });
            /* Este update es para cuando se actualice la pagina */
            updateButtons(parseInt($("#counter").val()));
            /* Funciones y codigo para el contador FIN*/
            $("#amount").html("Limit " + lego.Cantidad)


            $("#Item").text(lego.Modelo)
            $("#Pieces").text(lego.Piezas)
            $("#Age").text(lego["Edad minima"] + "+")
            $("#Description").text(lego.Descripcion)
            $("#Released").text("Year Released: " + lego["Anio Lanzamiento"])
            $("#High").text("High: " + lego.Altura)
            $("#Long").text("Long: " + lego.Ancho)
            $("#Deep").text("Deep: " + lego.Profundidad)

            /* Resenias */
            $("#reviews").html('')
            for (let index = 0; index < 3; index++) {
                var idComentario = Math.floor(Math.random() * (80 - 1 + 1)) + 1;
                var review = `<hr><br>
                        <p class="fs-6">${reviews[idComentario].Date}</p>`

                var stars = generateStars(reviews[idComentario].Calification)
                review += `<div class="list-group-item d-flex gap-1 align-items-center bigger-list m-0" id="categories">
                            ${stars}
                            <b id="Calification">${reviews[idComentario].Calification}</b>
                           </div>`

                review += `<p class="fs-4"><b>${reviews[idComentario].Title}</b></p>
                        <p class="fs-5">@${reviews[idComentario].Username}</p>
                        <p class="fs-5">${reviews[idComentario].Comment}</p>`

                $("#reviews").append(review)
            }

            $("#cart-option").html('');
            const cartLink = `<button type="button" class="btn btn-lg btn-primary px-5" onclick="addToCart(this)" data-id="(${legoId})">Add to cart</button>`
            $("#cart-option").append(cartLink);
        }
    }
})