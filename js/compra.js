/* Obtener el producto y crear el item de compra en el local storage */
function addToCart(element) {
    let LegoItem = legos[element - 1]
    let id = LegoItem.Id
    let price = LegoItem.Precio
    let name = LegoItem.Nombre
    let limit = LegoItem.Cantidad

    let cartItem = {
        id,
        name,
        price,
        cantidad: 1,
        limit,
        subTotal: price * 1
    }

    let cartArray = new Array()
    /* Pregunta si ya existe */
    if (localStorage.getItem('compra')) {
        cartArray = JSON.parse(localStorage.getItem('compra'))
    }
    /* Pregunta si se guardo algo en el array para buscar el que ocupamos */
    if (cartArray.length > 0) {
        let item = cartArray.findIndex((lego) => lego.id == id)

        if (item != -1) {
            cartArray[item].cantidad += 1
            if (cartArray[item].cantidad == LegoItem.Cantidad) {
                DesabilitarBoton(LegoItem.Id)
            }

        } else {
            cartArray.push(cartItem)
        }
    } else {
        cartArray.push(cartItem)
    }

    localStorage.setItem('compra', JSON.stringify(cartArray))
    console.log(JSON.parse(localStorage.getItem('compra')))
    $.notify(cartItem.name + " Added to the cart", "success")
}



/* Remueve el itel del carrito de compra */
function removeCartItem(idElement) {
    var cartArray = JSON.parse(localStorage.getItem('compra'))
    let item
    if (cartArray) {
        let index = cartArray.findIndex((obj) => obj.id == idElement)
        item = cartArray[index]
        //Elimina el item
        cartArray.splice(index, 1)
    }
    //Guarda el carrito actualizado
    localStorage.setItem('compra', JSON.stringify(cartArray))
    $.notify(item.name + " deleted from the cart", "error")
    //actualiza
    showDetailShop()
}

function removePurchase() {
    if (localStorage.getItem('compra')) {
        localStorage.removeItem('compra');
        showDetailShop()

        $.notify("Successful Purchase", "success")
    }
}

/* Funciones y codigo para el contador INICIO*/
function updateButtons() {
    var cart = JSON.parse(localStorage.getItem('compra'))
    if (cart) {

        cart.forEach(function (item) {
            id = item.id
            limit = item.limit
            if (item.cantidad <= 0) {
                /*  $(`#decrement${id}`).prop("disabled", true); */
                removeCartItem(item.id)
                showDetailShop()

            } else {
                $(`#decrement${id}`).prop("disabled", false);
            }
            if (item.cantidad >= limit) {
                $(`#increment${id}`).prop("disabled", true);
            } else {
                $(`#increment${id}`).prop("disabled", false);
            }

        });
    }

}


function incrementButton(id, limit) {
    var counter = parseInt($(`#counter${id}`).val());
    if (counter < limit) {
        counter++;
        $(`#counter${id}`).val(counter);
        updateCartItem(id, counter)
        updateButtons()
    }
}

function decrementButton(id) {
    var counter = parseInt($(`#counter${id}`).val());
    if (counter > 0) {
        counter--;
        $(`#counter${id}`).val(counter);
        updateButtons()
        updateCartItem(id, counter)

    }
}

/* Funcion normal (FUNCIONAL) */
/* Actualiza el local storage con el nuevo item */
function updateCartItem(element, counter) {
    var idLego = element
    var quantity = parseInt(counter)
    var nombre
    var cartArray = JSON.parse(localStorage.getItem('compra'))

    if (cartArray) {
        var itemIndex = cartArray.findIndex((obj) => obj.id == idLego)
        cartArray[itemIndex].cantidad = quantity
        nombre = cartArray[itemIndex].name
    }

    localStorage.setItem('compra', JSON.stringify(cartArray))
    $.notify(nombre + " successfully updated", "info");
    showDetailShop()
    if (quantity == 0) {
        removeCartItem(idLego)
        showDetailShop()

    }
}

/* FUNCION CON AJAX */
/* function updateCartItem(element, counter) {
    var idLego = element
    var quantity = parseInt(counter)
    var nombre
    var cartArray = JSON.parse(localStorage.getItem('compra'))

    if (cartArray) {
        var itemIndex = cartArray.findIndex((obj) => obj.id == idLego)
        cartArray[itemIndex].cantidad = quantity
        nombre = cartArray[itemIndex].name
    }
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'POST',
        data: JSON.stringify({ id: idLego, quantity: quantity }),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            console.log('Respuesta de la API: ', response);
            localStorage.setItem('compra', JSON.stringify(cartArray))
            showDetailShop()
            updateButtons()
            $.notify(nombre + " successfully updated", "info");
            if (quantity == 0 ) {
                removeCartItem(idLego)
                showDetailShop()

            }

        },
        error: function (xhr, status, error) {
            console.error("Error al actualizar la cantidad: ", error)
            $.notify(nombre + "Hubo un error al actualizar la cantidad", "error");
        }
    })
} */


/* Para mostrar el detalle en la pagina del carrito */
function showDetailShop() {
    var cartRowHTML = ''
    var itemCount = 0
    var total = 0

    var price = 0
    var quantity = 0
    var subTotal = 0
    var cart = JSON.parse(localStorage.getItem('compra'))
    if (cart) {

        cart.forEach(function (item) {
            price = parseFloat(item.price) | 0
            quantity = parseInt(item.cantidad) | 0
            subTotal = price * quantity
            itemCount += quantity


            cartRowHTML += `<div class="container-product">
                <div class="row gx-0">
                        <!-- Nombre del producto -->
                        <div class="col-md-4 col-6 mb-4" style="align-self: center;">
                            <h2 class="heading-2">Product</h2>
                            <div class="p-3 value">${item.name}</div>
                        </div>
                        <!-- Cantidad -->
                        <div class="col-md-2 col-6 mb-4" style="align-self: center;">
                            <h2 class="heading-2">Quantity</h2>
                            <div class="btn-group p-3 value mx-auto" role="group" aria-label="Default button group">
                                <button id="decrement${item.id}" type="button" class="btn btn-outline-secondary px-3"  onclick="decrementButton(${item.id},${item.limit})">-</button>
                                <input class="smaller-input text-center" type="text" id="counter${item.id}" value="${item.cantidad}" readonly>
                                <button id="increment${item.id}" type="button" class="btn btn-outline-secondary px-3"  onclick="incrementButton(${item.id},${item.limit})">+</button>
                            </div>
                        </div>
                        <!-- Precio -->
                        <div class="col-md-2 col-6 mb-4" style="align-self: center;">
                            <h2 class="heading-2">Price</h2>
                            <div class="p-3 value">&dollar;${item.price}</div>
                        </div>
                        <!-- subtotal-->
                        <div class="col-md-2 col-6 mb-4" style="align-self: center;">
                            <h2 class="heading-2">Subtotal</h2>
                            <div class="p-3 value">&dollar;${subTotal.toFixed(2)}</div>
                        </div>
                        <!--botón de basura-->
                        <div class="col-md-2 col-12 text-center" style="padding-top: 20px;">
                            <button type="button" class="btn btn-success btn-lg" style="margin-bottom: 20px;" onclick="removeCartItem(${item.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>`
            total += subTotal
        });
    }

    $('#detail').html(cartRowHTML);
    $('#total-items').text(itemCount);
    $('#total-compra').text("$" + total.toFixed(2));

}