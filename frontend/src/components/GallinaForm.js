import { useState } from 'react';
import API from '../services/api';

// formatear raza
const formatRaza = (texto) => {
  return texto
    .toLowerCase()
    .split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
};

function GallinaForm({ onCreated }) {
  const [form, setForm] = useState({
    codigo: '',
    raza: '',
    edad: ''
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'edad' && value < 0) return;

    if (name === 'raza') {
      value = formatRaza(value);
    }

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.codigo || !form.raza || form.edad === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    API.post('/gallinas', form)
      .then(() => {
        alert('Gallina creada 🐓');
        setForm({ codigo: '', raza: '', edad: '' });
        if (onCreated) onCreated();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Gallina</h2>

      <input
        type="text"
        name="codigo"
        placeholder="Código"
        value={form.codigo}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="raza"
        placeholder="Raza (Ej: Isa Brown)"
        value={form.raza}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="edad"
        placeholder="Edad (meses)"
        value={form.edad}
        onChange={handleChange}
        min="0"
        required
      />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default GallinaForm;