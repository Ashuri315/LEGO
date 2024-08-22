$(document).ready(function () {

    const URLParams = new URLSearchParams(window.location.search)
    const legoId = URLParams.get("id")
    if (legoId) {
        const lego = legos.find((l) => l.Id == legoId)
        if (lego) {
            LimiteBoton(lego)
          /*   contador() */
        }
    }

})

/* Funcion para ver el contador con la cantidad del carrito */
/* function contador(){
    let cartArray = new Array()
    if (localStorage.getItem('compra')) {
        cartArray = JSON.parse(localStorage.getItem('compra'))
    }
    if (cartArray.length > 0) {
        let item = cartArray.findIndex((lego) => lego.id == id)

        if (item != -1) {
            cartArray[item].cantidad = parseInt(contador)
                $("#counter").val(cartArray[item].cantidad)
                DesabilitarBoton()
        }
    }
}
 */

    function addToCartDetail(element) {
        let contador=parseInt($("#counter").val())
        let LegoItem = legos[element - 1]
        let id = LegoItem.Id
        let price = LegoItem.Precio
        let name = LegoItem.Nombre
        let limit = LegoItem.Cantidad
    
        let cartItem = {
            id,
            name,
            price,
            cantidad: contador,
            limit,
            subTotal: price * contador
        }
    
        let cartArray = new Array()
        if (localStorage.getItem('compra')) {
            cartArray = JSON.parse(localStorage.getItem('compra'))
        }
        if (cartArray.length > 0) {
            let item = cartArray.findIndex((lego) => lego.id == id)
    
            if (item != -1) {
                /* cartArray[item].cantidad = parseInt(contador) */
                contadorActualizado = cartArray[item].cantidad + contador
                if (cartArray[item].cantidad == LegoItem.Cantidad) {
                    
                    DesabilitarBoton()
                }
                if (contadorActualizado >= LegoItem.Cantidad) {
                    cartItem.cantidad = LegoItem.Cantidad
                    cartArray[item].cantidad = cartItem.cantidad
                    DesabilitarBoton()
                }else{
                    cartItem.cantidad = contadorActualizado
                    cartArray[item].cantidad = cartItem.cantidad
                }
    
            } else {
                cartArray.push(cartItem)
            }
        } else {
            cartArray.push(cartItem)
        }
        
        localStorage.setItem('compra', JSON.stringify(cartArray))
        console.log(JSON.parse(localStorage.getItem('compra')))
        LimiteBoton(LegoItem)
        $.notify(cartItem.name + " Added to the cart", "success")
    }

/* Inicio habilitadores de boton */
function LimiteBoton(element) {
    let cartArray = new Array()
    if (localStorage.getItem('compra')) {
        cartArray = JSON.parse(localStorage.getItem('compra'))
    }
    if (cartArray.length > 0) {
        let item = cartArray.findIndex((lego) => lego.id == element.Id)

        if (item != -1) {
            if (cartArray[item].cantidad >= element.Cantidad) {
                DesabilitarBoton(element.Id)
            }
            if (cartArray[item].cantidad == 0) {
                DesabilitarBoton(element.Id)
            }

        }
    }

}
/* habilitar boton o no de carrito*/
function DesabilitarBoton() {
    $("#item").attr("disabled", true);
    $("#item").text("Limit exceeded");
}
function HabilitarBoton(item) {
    $(`#${item}`).attr("disabled", true);
    $(`#${item}`).text("Limit exceeded");
}
/* Fin habilitadores de boton */