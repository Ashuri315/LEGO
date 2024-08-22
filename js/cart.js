document.addEventListener('DOMContentLoaded', function() {
    // Declaración de variables y elementos de la interfaz
    const cardNumber = document.getElementById('card-number');
    const cvc = document.getElementById('CVC');
    const expiryDate = document.getElementById('expiry');
    const inputPostal = document.getElementById('delivery-number');
    const titularInput = document.getElementById('titular');
    const postalRadio = document.getElementById('postal');
    const storeRadio = document.getElementById('store');
    const cardPayRadio = document.getElementById('card-pay');
    const cashPayRadio = document.getElementById('cash*pay');

    const formTarjeta = document.getElementById('formulario-tarjeta');
    const postalWarning = document.getElementById('postal-warning');
    const deliveryInstruction = document.getElementById('delivery-label');
    const cardWarning = document.getElementById('card-warning');
    const cvcWarning = document.getElementById('cvc-warning');
    const titularWarning = document.getElementById('titular-warning');
    const expiryWarning = document.getElementById('expiry-warning');
    const totalCompra = document.getElementById('total-compra');
    const contenedorForm = document.getElementById('contenedor-formulario');

    actualizaFormTarjeta();
    updateFieldVisibility();
    actualizarVisibilidadForm();
    
    // Funciones auxiliares
    function restrictLetters(input) {
        input.value = input.value.replace(/[^\d]/g, '');
    }

    function restricNumbers(input) {
        input.value = input.value.replace(/[0-9]/g, '');
    }

    function verificaTarjeta() {
        const numero = cardNumber.value.replace(/\s+/g, '');
        const apiURL = `https://data.handyapi.com/bin/${numero}`;

        fetch(apiURL)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                let imgSrc = 'img/cart/credit-card.png';
                if (data.Scheme === 'MASTERCARD') imgSrc = 'img/cart/Mastercard.png';
                if (data.Scheme === 'VISA') imgSrc = 'img/cart/VISA.png';
                document.getElementById('card-image').src = imgSrc;
            })
            .catch(() => {
                document.getElementById('card-image').src = 'img/cart/credit-card.png';
            });
    }

    function verificaExpiracion() {
        let value = expiryDate.value.replace(/\D/g, '');
        if (value.length < 2) {
            expiryDate.value = value;
            return;
        }
        if (value.length > 2 && value.length <= 4) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        } else if (value.length > 4) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
        }
        if (expiryDate.value.length > 0 && expiryDate.value[expiryDate.value.length - 1] === '/') {
            expiryDate.value = expiryDate.value.slice(0, -1);
        }
        expiryDate.value = value;
    }

    function verificaLargoExpiración() {
        if (expiryDate.value.length === 5 || expiryDate.value.length === 0) {
            expiryWarning.style.visibility = "hidden";
        } else {
            expiryWarning.style.visibility = "visible";
        }
    }

    function verificaCodigoPostal() {
        if (inputPostal.value.trim().length === 6 || inputPostal.value.length === 0) {
            postalWarning.style.display = "none";
        } else {
            postalWarning.style.display = "block";
        }
    }

    function verificarTitular() {
        const titularPattern = /^([A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s([A-Za-zÁÉÍÓÚÑáéíóúñ]+\s)?[A-Za-zÁÉÍÓÚÑáéíóúñ]+\s[A-Za-zÁÉÍÓÚÑáéíóúñ]+$/;
        if (titularInput.value.trim().length === 0 || !titularPattern.test(titularInput.value.trim())) {
            titularWarning.style.visibility = "visible";
        } else {
            titularWarning.style.visibility = "hidden";
        }
    }

    function verificarCVC() {
        const cvcTexto = cvc.value.replace(/\s+/g, '');
        if (cvcTexto.length === 3 || cvcTexto.length === 0) {
            cvcWarning.style.visibility = "hidden";
        } else {
            cvcWarning.style.visibility = "visible";
        }
    }

    function verificarLongitud() {
        const expectedSrc = new URL('img/cart/credit-card.png', window.location.origin).href;
        const codigo = cardNumber.value.replace(/\s+/g, '');
        if (codigo.length === 0 || codigo.length === 16 && !(document.getElementById('card-image').src.includes(expectedSrc))) {
            cardWarning.style.visibility = "hidden";
        }else{
            cardWarning.style.visibility = "visible";
        }

    }

    function updateFieldVisibility() {
        const postalChecked = document.getElementById('postal').checked;
        if (postalChecked) {
            inputPostal.style.display = 'block';
            deliveryInstruction.style.display = "block";
            document.getElementById('cash-pay').disabled = true;
            document.getElementById('card-pay').checked = true;
            formTarjeta.style.display = "block";
        } else {
            postalWarning.style.display = "none";
            inputPostal.value = '';
            inputPostal.style.display = 'none';
            deliveryInstruction.style.display = "none";
            document.getElementById('cash-pay').disabled = false;
        }
    }

    function actualizaFormTarjeta(){
        const cardPayChecked = document.getElementById('card-pay').checked;
        formTarjeta.style.display = cardPayChecked ? "block" : "none";
        
    }

    function mostrarImagenCarritoVacio(){
        var contenedorImagen =   `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: auto; position: relative;">
                                    <div  style="width: 50%; padding-top: 50%; position: relative;">
                                        <img src="img/cart/default-cart-image.jpeg" alt="image that shows when there's no item in the cart" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; ">
                                    </div>
                                    <a href="lista-productos.html"><button type="button" class="btn btn-dark btn-lg"><i class="fa-solid fa-cart-shopping"></i>  Go shopping</button></a>
                                </div> `
        $('#detail').html(contenedorImagen);
    }

    function actualizarVisibilidadForm() {
        if(totalCompra.textContent.trim() === '$0' || totalCompra.textContent.trim() === '$' || totalCompra.textContent.trim() === '$0.00'){
            contenedorForm.style.display = "none";
            mostrarImagenCarritoVacio();

        }else{
            contenedorForm.style.display = "block";
        }
    }

    // Event Listeners
    cardNumber.addEventListener('input', function() {
        restrictLetters(cardNumber);
        verificaTarjeta();
        verificarLongitud();
    });

    cvc.addEventListener('input', function() {
        restrictLetters(cvc);
        verificarCVC();
    });

    expiryDate.addEventListener('input', function() {
        restrictLetters(expiryDate);
        verificaExpiracion();
        verificaLargoExpiración();
    });

    inputPostal.addEventListener('input', function() {
        restrictLetters(inputPostal);
        verificaCodigoPostal();
    });

    titularInput.addEventListener('input', function() {
        restricNumbers(titularInput);
        verificarTitular();
    });

    document.querySelectorAll('input[name="tipo-entrega"]').forEach(radio => {
        radio.addEventListener('change', updateFieldVisibility);
    });

    document.querySelectorAll('input[name="tipo-pago"]').forEach(radio => {
        radio.addEventListener('change', actualizaFormTarjeta);
    });

    document.getElementById('formulario-compra').addEventListener('submit', function(event) {
        let allValid = true;

        if(storeRadio.checked){
            $('#shipping-method-factura').html('Pick up in store');
        }else{
            $('#shipping-method-factura').html('Postal Delivery');
            $('#payment-method-factura').html('By Card');
            if (postalWarning.style.display === "block" || inputPostal.value.length === 0) {
                allValid = false;
                inputPostal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                postalWarning.textContent = inputPostal.value.length === 0 ? 'Insert the delivery number' : postalWarning.textContent;
                postalWarning.style.display = "block"
            }
        }
        if(cardPayRadio.checked){
            $('#payment-method-factura').html('By Card');
            //Validaciónde cada campo
            if (cardWarning.style.visibility === "visible" || cardNumber.value.length === 0) {
                allValid = false;
                cardNumber.scrollIntoView({ behavior: 'smooth', block: 'center' });
                cardWarning.textContent = cardNumber.value.length === 0 ? 'Invalid card number' : cardWarning.textContent;
                cardWarning.style.visibility = "visible";
                
            }
            if (titularWarning.style.visibility === "visible" || titularInput.value.length === 0) {
                allValid = false;
                titularInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                titularWarning.textContent = titularInput.value.length === 0 ? 'Invalid titular name' : titularWarning.textContent;
                titularWarning.style.visibility = "visible"
            }
            if (cvcWarning.style.visibility === "visible" || cvc.value.length === 0) {
                allValid = false;
                cvc.scrollIntoView({ behavior: 'smooth', block: 'center' });
                cvcWarning.textContent = cvc.value.length === 0 ? 'Insert CVC number' : cvcWarning.textContent;
                cvcWarning.style.visibility = "visible"
            }
            if (expiryWarning.style.visibility === "visible" || expiryDate.value.length === 0) {
                allValid = false;
                expiryDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
                expiryWarning.textContent = expiryDate.value.length === 0 ? 'Insert the expiry date' : expiryWarning.textContent;
                expiryWarning.style.visibility = "visible"
            }
        }else{
            $('#payment-method-factura').html('By Cash');
        }
            
        if (allValid) {
            llenarFactura(); 
            const modal = new bootstrap.Modal(document.getElementById('modalFactura'));
            modal.show();
            removePurchase();
            this.reset();
            event.preventDefault();
            actualizarVisibilidadForm();
        } else {
            event.preventDefault();
        }

    });

    function llenarFactura(){
        var total = document.getElementById('total-compra');
        var cart = JSON.parse(localStorage.getItem('compra'));
        var price = 0;
        var quantity = 0;
        var subTotal = 0;
        var cartRowHTML = '';
        if(cart){
            cart.forEach(function (item) {
                price = parseFloat(item.price) || 0;
                quantity = parseInt(item.cantidad) || 0;
                subTotal = price * quantity;

                cartRowHTML += `<div class="separador col-12 pt-3">
                                    <div class="row">
                                        <div class="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <div class="fs-5 text-center justify-content-center" id="product-name-receipt">${item.name}</div>
                                        </div>
                                        <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                            <div class="fs-5 text-center justify-content-center" id="quantity">${quantity}</div>
                                        </div>
                                        <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                            <div class="fs-5 text-center justify-content-center" id="price-product">&dollar;${subTotal.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>`;
            });
        }
        $('#lista-legos-factura').html(cartRowHTML);
        $('#total-factura').text(total.textContent.trim());
    }

    // Observer para actualizar la visibilidad del formulario
    const observer = new MutationObserver(actualizarVisibilidadForm);
    observer.observe(totalCompra, { childList: true, subtree: true });
});