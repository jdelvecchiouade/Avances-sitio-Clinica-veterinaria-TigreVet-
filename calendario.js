const calendarElement = document.getElementById('calendar');
const bookingForm = document.getElementById('booking-form');
const dateInput = document.getElementById('date');
const confirmationMessage = document.getElementById('confirmation');

let selectedDate = null; // Variable para almacenar la fecha seleccionada
const currentDate = new Date();
let actualMonth = currentDate.getMonth();
let actualYear = currentDate.getFullYear();

function removeAllSelected() {
    const selectedElements = document.querySelector('.selected');
    if (selectedElements) {
        selectedElements.classList.remove('selected');
    }
}


function generateCalendar(year,month) {
    const currentDate = new Date();
    if (year === undefined) {
        year = currentDate.getFullYear();
    }
    if (month === undefined) {
        month = currentDate.getMonth();  
    }
    const monthString = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const nameMonth = monthString[month];
        document.getElementById('month-year').textContent = nameMonth + ' ' + year;
    const lastDay = new Date(year, month + 1, 0);
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = i;

        const dayDate = new Date(year, month, i);
        const today = new Date();
        if (dayDate < today) {
            dayDiv.style.backgroundColor = '#f0f0f0'; // Día pasado
            dayDiv.style.cursor = 'not-allowed'; // Desactivar el clic
            dayDiv.onclick = null; // Desactivar el clic
            dayDiv.style.textDecoration = 'line-through'; // Tachado
            dayDiv.style.color = '#aaa'; // Color gris para los días pasados
        } else {
            dayDiv.addEventListener('click', (event) => selectDate(event,i));
        }

        calendarElement.appendChild(dayDiv);
    }


}

function selectDate(event, day) {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    selectedDate = new Date(year, month, day); // Almacenar la fecha seleccionada

    removeAllSelected();

    // Cambiar el color de fondo del elemento seleccionado
    event.target.classList.add('selected');

    dateInput.value = selectedDate.toLocaleDateString();
    bookingForm.classList.remove('hidden');
}

document.getElementById('reserveForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
    if (!selectedDate) {
        alert('Por favor, selecciona una fecha antes de reservar.'); // Mensaje de advertencia si no hay fecha seleccionada
        return;
    }

    const name = document.getElementById('name').value;
    const date = selectedDate.toLocaleDateString();

    confirmationMessage.textContent = `Reserva realizada para ${name} el ${date}.`;
    confirmationMessage.classList.remove('hidden'); // Mostrar el mensaje de confirmación
    bookingForm.classList.add('hidden'); // Ocultar el formulario
});

document.getElementById('prev-month').addEventListener('click', function () {
    calendarElement.innerHTML = '';
    // Calcular el mes y año anterior
    if (actualMonth === 0) {
        actualMonth = 11;
        actualYear -= 1;
    } else {
        actualMonth -= 1;
    }
    generateCalendar(actualYear, actualMonth);
   
});

document.getElementById('next-month').addEventListener('click', function () {
    calendarElement.innerHTML = '';
     // Calcular el mes y año anterior
     if (actualMonth === 11) {
        actualMonth = 0;
        actualYear += 1;
    } else {
        actualMonth += 1;
    }
    generateCalendar(actualYear, actualMonth);
}
);

generateCalendar(actualYear, actualMonth); // Generar el calendario del mes actual
