import { useEffect, useState } from 'react';
import API from '../services/api';

// 🔹 FORMATEAR RAZA
const formatRaza = (texto) => {

  return texto
    .toLowerCase()
    .split(' ')
    .map(p =>
      p.charAt(0).toUpperCase() + p.slice(1)
    )
    .join(' ');
};

function GallinaForm({ onCreated }) {

  const [galpones, setGalpones] = useState([]);

  const [form, setForm] = useState({
    codigo: '',
    raza: '',
    edad: '',
    galpon_id: ''
  });

  // 🔹 CARGAR GALPONES
  useEffect(() => {

    API.get('/galpones')
      .then(res => setGalpones(res.data))
      .catch(err => console.error(err));

  }, []);

  // 🔹 CAMBIOS
  const handleChange = (e) => {

    let {
      name,
      value
    } = e.target;

    if (name === 'edad' && value < 0) return;

    if (name === 'raza') {
      value = formatRaza(value);
    }

    setForm({
      ...form,
      [name]: value
    });
  };

  // 🔹 GUARDAR
  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !form.codigo ||
      !form.raza ||
      form.edad === '' ||
      !form.galpon_id
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    API.post('/gallinas', form)
      .then(() => {

        alert('Gallina creada 🐓');

        setForm({
          codigo: '',
          raza: '',
          edad: '',
          galpon_id: ''
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
        Crear Gallina
      </h2>

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

      {/* GALPÓN */}
      <select
        name="galpon_id"
        value={form.galpon_id}
        onChange={handleChange}
        required
      >

        <option value="">
          Seleccione galpón
        </option>

        {galpones.map(g => (

          <option
            key={g.id}
            value={g.id}
          >
            {g.nombre}
          </option>

        ))}

      </select>

      <button type="submit">
        Guardar
      </button>

    </form>
  );
}

export default GallinaForm;