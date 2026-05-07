import { useEffect, useState } from 'react';
import API from '../services/api';

function ProduccionPage() {
  const [gallinas, setGallinas] = useState([]);
  const [produccion, setProduccion] = useState([]);
  const [openGallina, setOpenGallina] = useState(null);

  const [form, setForm] = useState({
    gallina_id: '',
    fecha: '',
    produjo: '1',
    observaciones: ''
  });

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
        alert('Registro guardado 🥚');

        setForm({
          gallina_id: '',
          fecha: '',
          produjo: '1',
          observaciones: ''
        });

        fetchProduccion();
      })
      .catch(err => console.error(err));
  };

  // 🔥 AGRUPAR HISTORIAL POR GALLINA
  const getHistorialPorGallina = (codigo) => {
    return produccion.filter(p => p.codigo === codigo);
  };

  return (
    <div className="container">

      <h1>🥚 Producción Diaria</h1>

      <div className="grid">

        {/* FORM */}
        <div className="card">
          <h3>Registrar Producción</h3>

          <form onSubmit={handleSubmit}>

            <select
              name="gallina_id"
              value={form.gallina_id}
              onChange={handleChange}
              required
            >
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

            <select
              name="produjo"
              value={form.produjo}
              onChange={handleChange}
            >
              <option value="1">✅ Produjo huevo</option>
              <option value="0">❌ No produjo</option>
            </select>

            <input
              type="text"
              name="observaciones"
              placeholder="Observaciones"
              value={form.observaciones}
              onChange={handleChange}
            />

            <button className="btn-save">
              Guardar
            </button>

          </form>
        </div>

      </div>

      {/* HISTORIAL POR GALLINA */}
      <h2 style={{ marginTop: 30 }}>🐓 Historial por Gallina</h2>

      {gallinas.map(g => {
        const historial = getHistorialPorGallina(g.codigo);

        return (
          <div key={g.id} className="card" style={{ marginBottom: 10 }}>

            {/* HEADER CLICKABLE */}
            <div
              style={{ cursor: 'pointer' }}
              onClick={() =>
                setOpenGallina(openGallina === g.codigo ? null : g.codigo)
              }
            >
              <h3>
                🐓 {g.codigo} ({historial.length} registros)
              </h3>
              <small>
                Click para ver historial
              </small>
            </div>

            {/* EXPANDIBLE */}
            {openGallina === g.codigo && (
              <div style={{ marginTop: 10 }}>

                {historial.length === 0 ? (
                  <p>Sin registros</p>
                ) : (
                  <table width="100%" cellPadding="8">
                    <thead>
                      <tr>
                        <th>📅 Fecha</th>
                        <th>Estado</th>
                        <th>📝 Observaciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {historial.map(h => (
                        <tr key={h.id}>
                          <td>
                            {new Date(h.fecha).toLocaleDateString()}
                          </td>

                          <td>
                            {h.produjo ? '✅' : '❌'}
                          </td>

                          <td>
                            {h.observaciones || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>
            )}

          </div>
        );
      })}

    </div>
  );
}

export default ProduccionPage;