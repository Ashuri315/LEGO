///////////////////////EVENT LISTENER/////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    //Número de tarjeta
    const cardNumber = document.getElementById('card-number');
    
    cardNumber.addEventListener('input', verificaTarjeta);

    cardNumber.addEventListener('input', function() {
        restrictLetters(cardNumber);
    });

    // CVC

    const cvc = document.getElementById('CVC');

    cvc.addEventListener('input', function() {
        restrictLetters(cvc);
    });

    //Vencimiento
    const expiryDate = document.getElementById('expiry');

    expiryDate.addEventListener('input', function() {
        restrictLetters(expiryDate);
    });
    //delivery number
    const inputPostal = document.getElementById('delivery-number');
    inputPostal.addEventListener('input', function(){
        restrictLetters(inputPostal);
    });

    //Nombre del titular

    const titularInput = document.getElementById('titular');
    titularInput.addEventListener('input', function(){
        restricNumbers(titularInput);
    });
    
});

/////////////////////////////////////////////////////////////////



document.addEventListener('DOMContentLoaded', function() {
    const inputExpiry = document.getElementById('expiry');
    inputExpiry.addEventListener('input', verificaExpiracion);

    inputExpiry.addEventListener('focus', function() {
        let cursorPos = this.value.length;
        this.setSelectionRange(cursorPos, cursorPos);
    });
});

/////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const inputExpiry = document.getElementById('expiry');
    inputExpiry.addEventListener('input', verificaLargoExpiración);
});

/////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const opcionesEntrega = document.querySelectorAll('input[name="tipo-entrega"]'); //REFERENCIA BOTONES DE RADIO, SE GUARDAN EN LISTA
    const inputPostal = document.getElementById('delivery-number');
    const postalWarning = document.getElementById('postal-warning');
    const deliveryInstruction = document.getElementById('delivery-label');
    const formTarjeta = document.getElementById('formulario-tarjeta')

    // Función para actualizar la visibilidad del campo de postal
    function updateFieldVisibility() {
        if (document.getElementById('postal').checked) {
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
    // Añade event listeners a cada botón de radio
    opcionesEntrega.forEach(radio => {
        radio.addEventListener('change', updateFieldVisibility);
    });

    updateFieldVisibility();
});

document.addEventListener('DOMContentLoaded', function() {
    const opcionesPago = document.querySelectorAll('input[name="tipo-pago"]'); //REFERENCIA BOTONES DE RADIO, SE GUARDAN EN LISTA
    const formTarjeta = document.getElementById('formulario-tarjeta')

    // Función para actualizar la visibilidad del campo de postal
    function updateFieldVisibility() {
        if (document.getElementById('card-pay').checked) {
            formTarjeta.style.display = "block";
        } else {
            formTarjeta.style.display = "none";
        }
    }
    // Añade event listeners a cada botón de radio
    opcionesPago.forEach(radio => {
        radio.addEventListener('change', updateFieldVisibility);
    });

    updateFieldVisibility();
});


/////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const inputCvc = document.getElementById('CVC');
    inputCvc.addEventListener('input', verificarCVC);
});

////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const postalInput = document.getElementById('delivery-number');
    postalInput.addEventListener('input', verificaCodigoPostal);
});

///////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const titularInput = document.getElementById('titular');
    titularInput.addEventListener('input', verificarTitular);
});

////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('card-number');
    input.addEventListener('input', verificarLongitud);
});

/////////////////////////EVENT LISTENER////////////////////////////////


///////////////////////////////FUNCIONES////////////////////////////////
function verificaCodigoPostal(){
    const inputPostal = document.getElementById('delivery-number');
    const postal = inputPostal.value.trim();
    const postalWarning = document.getElementById('postal-warning');

    if(postal.length === 6 || postal.length === 0){
        postalWarning.style.display = "none";
    }else{
        postalWarning.style.display = "block";
    }
}

function verificaExpiracion(){
    const input = document.getElementById('expiry');

    let value = input.value.replace(/\D/g, ''); 

        if (value.length < 2) {
            input.value = value;
            return;
        }

        if (value.length > 2 && value.length <= 4) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        } else if (value.length > 4) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
        }

        if (input.value.length > 0 && input.value[input.value.length - 1] === '/') {
            input.value = input.value.slice(0, -1);
        }

        input.value = value;
}

function verificaLargoExpiración(){
    const expiryDate = document.getElementById('expiry').value; 
    const expiryWarning = document.getElementById('expiry-warning');

    if (expiryDate.length === 5 || expiryDate.length === 0) { // Verifica la longitud del valor
        expiryWarning.style.visibility = "hidden";
    } else {
        expiryWarning.style.visibility = "visible";
    }
}

function verificarTitular(){
    const titularValue = document.getElementById('titular');
    const titular= titularValue.value.trim();
    const titularWarning = document.getElementById('titular-warning');
    const titularPattern = /^([A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s([A-Za-zÁÉÍÓÚÑáéíóúñ]+\s)?[A-Za-zÁÉÍÓÚÑáéíóúñ]+\s[A-Za-zÁÉÍÓÚÑáéíóúñ]+$/;

    if (titular.length === 0) {
        titularWarning.style.visibility = "hidden";
    } 
    // Verifica si el valor no cumple con el patrón
    else if (!titularPattern.test(titular)) {
        titularWarning.style.visibility = "visible";
    } 
    // Verifica si el valor cumple con el patrón
    else {
        titularWarning.style.visibility = "hidden";
    }
}

function verificarCVC() {
    const cvcInput = document.getElementById('CVC');
    const cvc = cvcInput.value.replace(/\s+/g, '');
    const cvcWarning = document.getElementById('cvc-warning');

    if (cvc.length === 3 || cvc.length === 0) {
        // Longitud es 0 o exactamente 3
        cvcWarning.style.visibility = "hidden";
    } else if (cvc.length < 3) {
        // Longitud es menor a 3
        cvcWarning.style.visibility = "visible";
    } 
}

function verificaTarjeta() {
    const numeroTarjeta = document.getElementById('card-number');
    const numero = numeroTarjeta.value.replace(/\s+/g, ''); // Elimina espacios en blanco del código de tarjeta
    const cardWarning = document.getElementById('card-warning');
    const apiURL = `https://data.handyapi.com/bin/${numero}`;
    const imagenTarjeta = document.getElementById('card-image');

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            if(data.Scheme === 'MASTERCARD'){
                imagenTarjeta.src = 'img/cart/Mastercard.png';

            }else if(data.Scheme === 'VISA'){
                imagenTarjeta.src = 'img/cart/VISA.png';
            }else{
                imagenTarjeta.src = 'img/cart/credit-card.png';
            }


        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            imagenTarjeta.src = 'img/cart/credit-card.png'; 
        });
}

function verificarLongitud(){
    const input = document.getElementById('card-number');
    const codigo = input.value.replace(/\s+/g, ''); // Elimina espacios en blanco del código de tarjeta
    const cardWarning = document.getElementById('card-warning');
    if (codigo.length === 16 || codigo.length === 0) {
        // Longitud es 0 o exactamente 16
        cardWarning.style.visibility = "hidden";
    } else if (codigo.length < 16 && codigo.length > 0 ) {
        // Longitud es menor a 16
        cardWarning.style.visibility = "visible";
        cardWarning.textContent = "Invalid card number (min 16 numbers)";
    } else {
        // Longitud es mayor a 16
        cardWarning.style.visibility = "hidden";
    }
}

function restrictLetters(input) {
    // Elimina todas las letras, incluyendo ñ
    input.value = input.value.replace(/[^\d]/g, '');
}

function restricNumbers(input) {
    // Reemplaza cualquier número en el contenido del input con una cadena vacía
    input.value = input.value.replace(/[0-9]/g, '');
}

///////////////PARA HACER QUE EL FORMULARIO APAREZCA Y DESAPAREZCA CUANDO SE TIENE 0 O $ ////////////////
        const totalCompra = document.getElementById('total-compra');
        const contenedorForm = document.getElementById('contenedor-formulario');

        function actualizarVisibilidadForm() {
            const contenido = totalCompra.textContent.trim();
            if (contenido === '$0' || contenido === '$') {
                contenedorForm.style.display = 'none';
            } else {
                contenedorForm.style.display = 'block';
            }
        }
        const observer = new MutationObserver(actualizarVisibilidadForm);

        observer.observe(totalCompra, { childList: true, subtree: true });

        actualizarVisibilidadForm();

        document.getElementById('formulario-compra').addEventListener('submit', function(event) {
            const cardWarning = document.getElementById('card-warning');
            const cardNumber = document.getElementById('card-number');
        
            const titularWarning = document.getElementById('titular-warning');
            const titularName = document.getElementById('titular');
        
            const cvcWarning = document.getElementById('cvc-warning');
            const cvc = document.getElementById('CVC');
        
            const expiryWarning = document.getElementById('expiry-warning');
            const expiryDate = document.getElementById('expiry');
        
            const postalRadio = document.getElementById('postal');
            const postalNumber = document.getElementById('delivery-number')
            const postalWarning = document.getElementById('postal-warning');
        
            if(cardWarning.style.visibility === "visible"){
                event.preventDefault();
                cardNumber.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }else if(cardNumber.value.length === 0){
                event.preventDefault();
                cardWarning.style.visibility = "visible";
                cardWarning.textContent = 'Insert the card number';
            }
        
            if(titularWarning.style.visibility === "visible"){
                event.preventDefault();
                titularName.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }else if(titularName.value.length === 0){
                event.preventDefault();
                titularWarning.style.visibility = "visible";
                titularWarning.textContent = 'Invalid titular name';
            }
        
            if(cvcWarning.style.visibility === "visible"){
                event.preventDefault();
                cvc.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }else if(cvc.value.length === 0){
                event.preventDefault();
                cvcWarning.style.visibility = "visible";
                cvcWarning.textContent = 'Insert CVC number';
            }
        
            if(expiryWarning.style.visibility === "visible"){
                event.preventDefault();
                expiryDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }else if(expiryDate.value.length === 0){
                event.preventDefault();
                expiryWarning.style.visibility = "visible";
                expiryWarning.textContent = 'Insert the expiry date';
            }
        
            if(postalRadio.checked){
                if(postalWarning.style.display === "block"){
                    event.preventDefault();
                    postalNumber.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }else if(postalNumber.value.length === 0){
                    event.preventDefault();
                    postalWarning.style.display = "block";
                    postalWarning.textContent = 'Insert the delivery number';
                }
                
            }
        
        });

function mostrarFactura(){
    if (localStorage.getItem('compra')) {
        cartArray = JSON.parse(localStorage.getItem('compra'))
    }
    
}