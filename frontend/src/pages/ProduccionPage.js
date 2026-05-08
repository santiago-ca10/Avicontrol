import { useEffect, useState } from 'react';
import API from '../services/api';

function ProduccionPage() {

  const [galpones, setGalpones] = useState([]);
  const [produccion, setProduccion] = useState([]);

  const [form, setForm] = useState({
    galpon_id: '',
    fecha: '',
    huevos: '',
    aves_activas: '',
    mortalidad: 0,
    alimento_kg: '',
    observaciones: ''
  });

  useEffect(() => {

    fetchGalpones();
    fetchProduccion();

  }, []);

  // 🔹 OBTENER GALPONES
  const fetchGalpones = () => {

    API.get('/galpones')
      .then(res => setGalpones(res.data))
      .catch(err => console.error(err));
  };

  // 🔹 OBTENER PRODUCCIÓN
  const fetchProduccion = () => {

    API.get('/produccion')
      .then(res => setProduccion(res.data))
      .catch(err => console.error(err));
  };

  // 🔹 CAMBIOS FORM
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 GUARDAR
  const handleSubmit = (e) => {

    e.preventDefault();

    API.post('/produccion', form)
      .then(() => {

        alert('Producción registrada 🥚');

        setForm({
          galpon_id: '',
          fecha: '',
          huevos: '',
          aves_activas: '',
          mortalidad: 0,
          alimento_kg: '',
          observaciones: ''
        });

        fetchProduccion();

      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">

      <h1>🥚 Producción Diaria</h1>

      <div className="grid">

        {/* FORMULARIO */}
        <div className="card">

          <h3>Registrar Producción</h3>

          <form onSubmit={handleSubmit}>

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
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="huevos"
              placeholder="🥚 Huevos producidos"
              value={form.huevos}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="aves_activas"
              placeholder="🐓 Aves activas"
              value={form.aves_activas}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="mortalidad"
              placeholder="☠️ Mortalidad"
              value={form.mortalidad}
              onChange={handleChange}
            />

            <input
              type="number"
              step="0.01"
              name="alimento_kg"
              placeholder="🍽️ Alimento (kg)"
              value={form.alimento_kg}
              onChange={handleChange}
            />

            <input
              type="text"
              name="observaciones"
              placeholder="📝 Observaciones"
              value={form.observaciones}
              onChange={handleChange}
            />

            <button className="btn-save">
              Guardar
            </button>

          </form>

        </div>

      </div>

      {/* HISTORIAL */}
      <h2 style={{ marginTop: 30 }}>
        📋 Historial de Producción
      </h2>

      {produccion.map(p => {

        const productividad =
          ((p.huevos / p.aves_activas) * 100).toFixed(1);

        return (

          <div
            key={p.id}
            className="card"
            style={{ marginBottom: 15 }}
          >

            <h3>
              🏠 {p.galpon}
            </h3>

            <p>
              📅 {new Date(p.fecha).toLocaleDateString()}
            </p>

            <p>
              🥚 Huevos: {p.huevos}
            </p>

            <p>
              🐓 Aves activas: {p.aves_activas}
            </p>

            <p>
              📈 Productividad: {productividad}%
            </p>

            <p>
              ☠️ Mortalidad: {p.mortalidad}
            </p>

            <p>
              🍽️ Alimento: {p.alimento_kg || 0} kg
            </p>

            <p>
              📝 {p.observaciones || '-'}
            </p>

          </div>
        );
      })}

    </div>
  );
}

export default ProduccionPage;