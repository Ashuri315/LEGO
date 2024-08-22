var mapa = L.map('map').setView([9.940017,-84.143373], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

L.marker([9.940017,-84.143373]).addTo(mapa)
    .bindPopup("LEGO")
    .openPopup();

L.circle([9.940017,-84.143373], {
    color: 'lightblue',
    fillColor: 'pink',
    fillOpacity: 0.5,
    radius: 100
}).addTo(mapa);


    const ageCalculator = (date) =>{
        const currentDate = new Date();
        const currentDay = parseInt(currentDate.getDate());
        const currentMonth = parseInt(currentDate.getMonth()) + 1;
        const currentYear = parseInt(currentDate.getFullYear());

        const birthYear = parseInt(String(date).substring(0, 4));
        const birthMonth = parseInt(String(date).substring(5, 7));
        const birthDay = parseInt(String(date).substring(8, 10));

        let edad = currentYear - birthYear;

        if(currentMonth > birthMonth){
            edad--;
        }else if(currentMonth === birthMonth){
            if(currentDay > birthDay){
                edad--;
            }
        }

        return edad;

    }

    document.getElementById('form').addEventListener('submit', function(event) {
        const name = document.getElementById('name');
        const errorMessage = document.getElementById('error-message');
        const namePattern = /^([A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s([A-Za-zÁÉÍÓÚÑáéíóúñ]+\s)?[A-Za-zÁÉÍÓÚÑáéíóúñ]+\s[A-Za-zÁÉÍÓÚÑáéíóúñ]+$/;
        var allValid = true;
        /*Validate that the name is in a correct format*/
        if (!namePattern.test(name.value)) {
            /*event.preventDefault();*/
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
        /*Validate that the age of the customer is more than 12*/
        if(birthDate.value){
            if(parseInt(ageCalculator(birthDate.value)) < 12){
                dateWarning.textContent = "Sorry, you need to be at least 12 years old";
                dateWarning.style.display = 'block';
                allValid = false;
                birthDate.style.marginBottom = '5px';
                birthDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }else{
                name.style.marginBottom = '25px';
                dateWarning.style.display = 'none';
            }
        }else{
            dateWarning.textContent= "Please insert a valid date";
            dateWarning.style.display = 'block';
            allValid = false;
            birthDate.style.marginBottom = '5px';
            birthDate.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        const email = document.getElementById('email');
        const emailWarning = document.getElementById('email-warning');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailPattern.test(email.value)){
            allValid = false;
            emailWarning.style.display = 'block';
            email.style.marginBottom = '5px';
            email.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }else{
            email.style.marginBottom = '25px';
            emailWarning.style.display = 'none';
        }

        const affair = document.getElementById('affair');
        const affairWarning = document.getElementById('affair-warning');

        if(!affair.value){
            allValid = false;
            affairWarning.style.display = 'block';
            affair.style.marginBottom = '5px';
            affair.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }else{
            affair.style.marginBottom = '25px';
            affairWarning.style.display = 'none';
        }

        const modal = document.getElementById('success-message-modal');

        if (allValid) {
            const modalElement = document.getElementById('success-message-modal');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
            event.preventDefault(); // Evita el envío del formulario para mostrar el modal
        } else {
            event.preventDefault(); // Evita el envío del formulario si hay errores de validación
        }

        /*if(!allValid){
            event.preventDefault();
        }*/
    });
