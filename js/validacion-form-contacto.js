

    document.addEventListener('DOMContentLoaded', function() {
        var dateInput = document.getElementById('birth-date');
    
        // Obtener la fecha actual
        var today = new Date();
    
        // Formatear la fecha actual en formato YYYY-MM-DD
        var year = today.getFullYear();
        var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Los meses están basados en 0 (Enero es 0)
        var day = today.getDate().toString().padStart(2, '0');
        var maxDate = `${year}-${month}-${day}`;
    
        // Establecer la fecha máxima al atributo max del input
        dateInput.setAttribute('max', maxDate);
    
        // Añadir evento para restringir números en el campo de nombre y asunto
        document.getElementById('name').addEventListener('input', function() {
            restrictNumbers(this);
        });
    
        document.getElementById('affair').addEventListener('input', function() {
            restrictNumbers(this);
        });
    });
    
    function restrictNumbers(input) {
        // Reemplaza cualquier dígito con una cadena vacía
        input.value = input.value.replace(/[0-9]/g, '');
    }
    
    document.getElementById('form').addEventListener('submit', function(event) {
        const name = document.getElementById('name');
        const errorMessage = document.getElementById('error-message');
        const namePattern = /^[A-Za-zÁÉÍÓÚÑáéíóúñ]+(\s[A-Za-zÁÉÍÓÚÑáéíóúñ]+)+$/; // Nombre debe contener al menos dos partes
    
        var allValid = true;
    
        // Validar que el nombre esté en el formato correcto
        if (!namePattern.test(name.value.trim())) {
            event.preventDefault();
            allValid = false;
            errorMessage.style.display = 'block';
            name.style.marginBottom = '5px';
            name.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            name.style.marginBottom = '25px';
            errorMessage.style.display = 'none';
        }
    
        const birthDate = document.getElementById('birth-date');
        const dateWarning = document.getElementById('date-warning');
    
        // Validar que la fecha de nacimiento sea válida y que la edad sea mayor de 12 años
        if (birthDate.value) {
            if (calculateAge(birthDate.value) < 12) {
                event.preventDefault();
                dateWarning.textContent = "Sorry, you need to be at least 12 years old";
                dateWarning.style.display = 'block';
                allValid = false;
                birthDate.style.marginBottom = '5px';
                birthDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                birthDate.style.marginBottom = '25px';
                dateWarning.style.display = 'none';
            }
        } else {
            event.preventDefault();
            dateWarning.textContent = "Please insert a valid date";
            dateWarning.style.display = 'block';
            allValid = false;
            birthDate.style.marginBottom = '5px';
            birthDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    
        const email = document.getElementById('email');
        const emailWarning = document.getElementById('email-warning');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Validar que el correo electrónico tenga el formato correcto
        if (!emailPattern.test(email.value.trim())) {
            event.preventDefault();
            allValid = false;
            emailWarning.style.display = 'block';
            email.style.marginBottom = '5px';
            email.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            email.style.marginBottom = '25px';
            emailWarning.style.display = 'none';
        }
    
        const affair = document.getElementById('affair');
        const affairWarning = document.getElementById('affair-warning');
    
        // Validar que el campo 'affair' no esté vacío
        if (!affair.value.trim()) {
            event.preventDefault();
            allValid = false;
            affairWarning.style.display = 'block';
            affair.style.marginBottom = '5px';
            affair.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            affair.style.marginBottom = '25px';
            affairWarning.style.display = 'none';
        }
    
        // Mostrar el modal si todos los campos son válidos
        if (allValid) {
            this.reset();
            const modalElement = document.getElementById('success-message-modal');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
            event.preventDefault(); // Evita el envío del formulario para mostrar el modal
        } else {
            event.preventDefault(); // Evita el envío del formulario si hay errores de validación
        }
    });
    
    // Función para calcular la edad a partir de la fecha de nacimiento
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
    
