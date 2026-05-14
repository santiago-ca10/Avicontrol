import { useEffect, useState } from 'react';
import API from '../services/api';

// FORMATEAR RAZA
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

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    codigo: '',
    raza: '',
    edad: '',
    galpon_id: ''
  });

  // =========================
  // CARGAR GALPONES
  // =========================
  useEffect(() => {

    fetchGalpones();

  }, []);

  const fetchGalpones = () => {

    API.get('/galpones')
      .then(res => setGalpones(res.data))
      .catch(err => console.error(err));

  };

  // =========================
  // CAMBIOS
  // =========================
  const handleChange = (e) => {

    let {
      name,
      value
    } = e.target;

    // EDAD NEGATIVA
    if (name === 'edad' && value < 0) {
      return;
    }

    // FORMATEAR RAZA
    if (name === 'raza') {
      value = formatRaza(value);
    }

    // FORMATEAR CÓDIGO
    if (name === 'codigo') {
      value = value.toUpperCase();
    }

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // =========================
  // GUARDAR
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.codigo ||
      !form.raza ||
      form.edad === '' ||
      !form.galpon_id
    ) {
      alert('Complete todos los campos');
      return;
    }

    try {

      setLoading(true);

      await API.post('/gallinas', form);

      alert('Gallina registrada correctamente');

      setForm({
        codigo: '',
        raza: '',
        edad: '',
        galpon_id: ''
      });

      fetchGalpones();

      if (onCreated) {
        onCreated();
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        'Error al crear gallina'
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // GALPÓN SELECCIONADO
  // =========================
  const galponSeleccionado = galpones.find(
    g => g.id === Number(form.galpon_id)
  );

  return (

    <form onSubmit={handleSubmit}>

      <h2>
        Registro de Gallinas
      </h2>

      {/* CÓDIGO */}
      <input
        type="text"
        name="codigo"
        placeholder="Código único"
        value={form.codigo}
        onChange={handleChange}
        required
      />

      {/* RAZA */}
      <input
        type="text"
        name="raza"
        placeholder="Raza"
        value={form.raza}
        onChange={handleChange}
        required
      />

      {/* EDAD */}
      <input
        type="number"
        name="edad"
        placeholder="Edad en meses"
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
          Seleccione un galpón
        </option>

        {galpones.map(g => {

          const total = Number(g.total_gallinas || 0);
          const capacidad = Number(g.capacidad || 0);

          const lleno = total >= capacidad;

          return (

            <option
              key={g.id}
              value={g.id}
              disabled={lleno}
            >
              {g.nombre}
              {' — '}
              {total}/{capacidad}
              {lleno ? ' (Lleno)' : ''}
            </option>

          );
        })}

      </select>

      {/* INFO GALPÓN */}
      {galponSeleccionado && (

        <div
          className="card"
          style={{
            marginTop: 16,
            padding: 14
          }}
        >

          <h3 style={{ marginBottom: 10 }}>
            Información del Galpón
          </h3>

          <p>
            <strong>Nombre:</strong>
            {' '}
            {galponSeleccionado.nombre}
          </p>

          <p>
            <strong>Capacidad:</strong>
            {' '}
            {galponSeleccionado.capacidad}
          </p>

          <p>
            <strong>Gallinas registradas:</strong>
            {' '}
            {galponSeleccionado.total_gallinas || 0}
          </p>

          <p>
            <strong>Ocupación:</strong>
            {' '}
            {galponSeleccionado.ocupacion || 0}%
          </p>

        </div>

      )}

      {/* BOTÓN */}
      <button
        type="submit"
        className="btn-save"
        disabled={loading}
        style={{ marginTop: 18 }}
      >
        {
          loading
            ? 'Guardando...'
            : 'Guardar Gallina'
        }
      </button>

    </form>
  );
}

export default GallinaForm;
