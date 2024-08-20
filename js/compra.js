/* Obtener el producto y hacer el item de compra */
function addToCart(element) {
    let LegoItem = legos[element - 1]
    let id = LegoItem.Id
    let price = LegoItem.Precio
    let name = LegoItem.Nombre

    /* let LegoParent = legos$(element).closest('div.lego-item')
    let id = element.dataset.id
    Se le debe quitar el simbolo de dolar
    let price = $(LegoParent).find('.lego-price').text()
	price= price.substring(1,price.length)
    let name = $(LegoParent).find('.lego-name').text() */
    //Elemento del carrito
    let cartItem = {
        id,
        name,
        price,
        cantidad: 1,
        subTotal: price * 1
    }

    let cartArray=new Array()
    /* Pregunta si ya existe */
    if (localStorage.getItem('compra')) {
        cartArray=JSON.parse(localStorage.getItem('compra'))
    }
    /* Pregunta si se guardo algo en el array para buscar el que ocupamos */
    if (cartArray.length>0) {
        let item=cartArray.findIndex((lego)=>lego.id==id)

        if (item != -1) {
            cartArray[item].cantidad+=1
            if (cartArray[item].cantidad == LegoItem.Cantidad) {
                OpcionBoton()
            }

        } else {
            cartArray.push(cartItem)
        }
    } else{
        cartArray.push(cartItem)
    }

    localStorage.setItem('compra', JSON.stringify(cartArray))
    console.log(JSON.parse(localStorage.getItem('compra')))
    $.notify(cartItem.name + " Added to the cart", "success")
}

function OpcionBoton() {
    /* if (condicion) {
        $("#cart-button").attr("disabled", condicion);
        $("#cart-button").text("Limit exceeded");
    } else{
        $("#cart-button").attr("disabled", condicion);
        $("#cart-button").text("Add to cart");
    } */
        $("#cart-button").attr("disabled", true);
       /*  $("#cart-button").text("Limit exceeded"); */
}