import { useEffect, useState } from 'react';
import API from '../services/api';

function ProduccionPage() {
  const [gallinas, setGallinas] = useState([]);
  const [form, setForm] = useState({
    gallina_id: '',
    fecha: '',
    cantidad: ''
  });
  const [produccion, setProduccion] = useState([]);

  // cargar gallinas
  useEffect(() => {
    API.get('/gallinas')
      .then(res => setGallinas(res.data))
      .catch(err => console.error(err));

    fetchProduccion();
  }, []);

  const fetchProduccion = () => {
    API.get('/produccion')
      .then(res => setProduccion(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post('/produccion', form)
      .then(() => {
        alert('Producción registrada 🥚');
        setForm({ gallina_id: '', fecha: '', cantidad: '' });
        fetchProduccion();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1>🥚 Producción de Huevos</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>
        <select name="gallina_id" value={form.gallina_id} onChange={handleChange} required>
          <option value="">Seleccione gallina</option>
          {gallinas.map(g => (
            <option key={g.id} value={g.id}>
              {g.codigo}
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
          name="cantidad"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          min="0"
          required
        />

        <button type="submit">Guardar</button>
      </form>

      {/* LISTA */}
      <h2>Historial</h2>

      <ul>
        {produccion.map(p => (
          <li key={p.id}>
            Gallina {p.codigo} - {p.fecha} - {p.cantidad} huevos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProduccionPage;