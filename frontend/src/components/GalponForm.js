import { useState } from 'react';
import API from '../services/api';

function GalponForm({ onCreated }) {

  const [form, setForm] = useState({
    nombre: '',
    capacidad: ''
  });

  // 🔹 CAMBIOS
  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // 🔹 GUARDAR
  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !form.nombre ||
      !form.capacidad
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    API.post('/galpones', form)
      .then(() => {

        alert('Galpón creado 🏠');

        setForm({
          nombre: '',
          capacidad: ''
        });

        if (onCreated) {
          onCreated();
        }

      })
      .catch(err => console.error(err));
  };

  return (

    <form onSubmit={handleSubmit}>

      <h2>
        Crear Galpón
      </h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre del galpón"
        value={form.nombre}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="capacidad"
        placeholder="Capacidad de aves"
        value={form.capacidad}
        onChange={handleChange}
        min="1"
        required
      />

      <button type="submit">
        Guardar
      </button>

    </form>
  );
}

export default GalponForm;
