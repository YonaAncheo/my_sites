fetch('http://localhost:3000/api/hotels')
  .then(res => res.json())
  .then(hoteles => {
    const selectHotel = document.getElementById('selectHotel');
    hoteles.forEach(hotel => {
      const option = document.createElement('option');
      option.value = hotel.id;
      option.textContent = `${hotel.nombre}`;
      selectHotel.appendChild(option);
    });
  });

const cargarPorHotel = async () => {
  const hotelSelect = document.getElementById('selectHotel');
  const hotelId = hotelSelect.value;
  const hotelNameInput = document.getElementById('hotel');
  const habitacionesList = document.getElementById('habitaciones');
  const reservasList = document.getElementById('reservas');
  const selectReserva = document.getElementById('selectReserva');
  const tituloReservas = document.getElementById('tituloReservas');

  habitacionesList.innerHTML = '';
  reservasList.innerHTML = '';
  selectReserva.innerHTML = '<option value="">Selecciona una reserva</option>';
  tituloReservas.textContent = '';

  if (!hotelId) return;

  const hotelNombre = hotelSelect.options[hotelSelect.selectedIndex].textContent;
  hotelNameInput.value = hotelNombre;
  tituloReservas.textContent = `Reservas en ${hotelNombre}`;

  const resHabitaciones = await fetch(`http://localhost:3000/api/rooms?hotel_id=${hotelId}`);
  const habitaciones = await resHabitaciones.json();

  const selectHabitacion = document.getElementById('selectHabitacion');
  selectHabitacion.innerHTML = '<option value="">Selecciona una habitación</option>';

  habitaciones.forEach(hab => {
    const li = document.createElement('li');
    li.textContent = `${hab.tipo} - $${hab.precio}`;
    habitacionesList.appendChild(li);

    const option = document.createElement('option');
    option.value = hab.tipo;
    option.textContent = `${hab.tipo} - $${hab.precio}`;
    selectHabitacion.appendChild(option);
  });

  const resReservas = await fetch('/api/reservations');
  const todas = await resReservas.json();
  const filtradas = todas.filter(r => r.hotel_id == hotelId);

  filtradas.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.id} - ${r.hotel} - Reservado a: ${r.cliente} - Habitación: ${r.habitacion} - Checkin: ${r.fechaEntrada}, Checkout: ${r.fechaSalida}`;
    reservasList.appendChild(li);

    const option = document.createElement('option');
    option.value = r.id;
    option.textContent = `${r.cliente} en ${r.hotel}`;
    option.dataset.hotel = r.hotel;
    option.dataset.habitacion = r.habitacion;
    option.dataset.cliente = r.cliente;
    option.dataset.fechaEntrada = r.fechaEntrada;
    option.dataset.fechaSalida = r.fechaSalida;
    selectReserva.appendChild(option);
  });
};

document.getElementById('selectHotel').addEventListener('change', cargarPorHotel);

document.getElementById('formulario').addEventListener('submit', async e => {
  e.preventDefault();
  const hotelId = document.getElementById('selectHotel').value;
  const reserva = {
    hotel_id: parseInt(hotelId),
    hotel: document.getElementById('hotel').value,
    cliente: document.getElementById('cliente').value,
    habitacion: document.getElementById('selectHabitacion').value,
    fechaEntrada: document.getElementById('entrada').value,
    fechaSalida: document.getElementById('salida').value
  };

  const res = await fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reserva)
  });

  const nueva = await res.json();
  alert('Reserva creada con ID: ' + nueva.id);
  location.reload();
});

document.getElementById('selectReserva').addEventListener('change', async function () {
  const selected = this.options[this.selectedIndex];
  if (!selected.value) {
    document.getElementById('formEditar').style.display = 'none';
    return;
  }

  const hotelNombre = selected.dataset.hotel;
  const habitacionActual = selected.dataset.habitacion;

  document.getElementById('editHotel').value = hotelNombre;
  document.getElementById('editCliente').value = selected.dataset.cliente;
  document.getElementById('editEntrada').value = selected.dataset.fechaEntrada;
  document.getElementById('editSalida').value = selected.dataset.fechaSalida;

  const resHoteles = await fetch('http://localhost:3000/api/hotels');
  const hoteles = await resHoteles.json();
  const hotel = hoteles.find(h => h.nombre === hotelNombre);

  const selectEditHabitacion = document.getElementById('selectEditHabitacion');
  selectEditHabitacion.innerHTML = '<option value="">Selecciona una habitación</option>';

  if (hotel) {
    const resHabitaciones = await fetch(`http://localhost:3000/api/rooms?hotel_id=${hotel.id}`);
    const habitaciones = await resHabitaciones.json();

    habitaciones.forEach(hab => {
      const option = document.createElement('option');
      option.value = hab.tipo;
      option.textContent = `${hab.tipo} - $${hab.precio}`;
      if (hab.tipo === habitacionActual) {
        option.selected = true;
      }
      selectEditHabitacion.appendChild(option);
    });
  }

  document.getElementById('formEditar').style.display = 'block';
});

document.getElementById('formEditar').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('selectReserva').value;
  const hotelId = document.getElementById('selectHotel').value;
  const reservaActualizada = {
    hotel_id: parseInt(hotelId),
    hotel: document.getElementById('editHotel').value,
    cliente: document.getElementById('editCliente').value,
    habitacion: document.getElementById('selectEditHabitacion').value,
    fechaEntrada: document.getElementById('editEntrada').value,
    fechaSalida: document.getElementById('editSalida').value
  };

  const res = await fetch('/api/reservations/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservaActualizada)
  });

  if (res.ok) {
    alert('Reserva actualizada correctamente');
    location.reload();
  } else {
    alert('Error al actualizar');
  }
});
