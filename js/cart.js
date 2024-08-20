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

    // Función para actualizar la visibilidad del campo de postal
    function updateFieldVisibility() {
        if (document.getElementById('postal').checked) {
            inputPostal.style.display = 'block';
            deliveryInstruction.style.visibility = "visible";
        } else {
            postalWarning.style.visibility = "hidden";
            inputPostal.value = '';
            inputPostal.style.display = 'none';
            deliveryInstruction.style.visibility = "hidden";
        }
    }
    // Añade event listeners a cada botón de radio
    opcionesEntrega.forEach(radio => {
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
        postalWarning.style.visibility = "hidden";
    }else{
        postalWarning.style.visibility = "visible";
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
    } else if (codigo.length < 16) {
        // Longitud es menor a 16
        cardWarning.style.visibility = "visible";
    } else {
        // Longitud es mayor a 16
        cardWarning.style.visibility = "hidden";
    }
}

function restrictLetters(input) {
    // Elimina todas las letras, incluyendo ñ
    input.value = input.value.replace(/[^\d]/g, '');
}