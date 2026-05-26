import { useEffect, useState } from 'react';
import API from '../services/api';

function GallinasPage() {
  const [gallinas, setGallinas] = useState([]);

  const fetchGallinas = () => {
    API.get('/gallinas')
      .then(res => setGallinas(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchGallinas();
  }, []);

  const deleteGallina = (id) => {
    if (!window.confirm('¿Eliminar gallina?')) return;

    API.delete(`/gallinas/${id}`)
      .then(() => fetchGallinas())
      .catch(err => console.error(err));
  };

  //  EDIT COMPLETO
  const updateGallina = (g) => {
    const codigo = prompt('Código:', g.codigo);
    if (codigo === null) return;

    const raza = prompt('Raza:', g.raza);
    if (raza === null) return;

    const edad = prompt('Edad:', g.edad);
    if (edad === null || edad < 0) return;

    const estado = prompt('Estado (activa/enferma/vendida):', g.estado || 'activa');
    if (estado === null) return;

    API.put(`/gallinas/${g.id}`, {
      codigo,
      raza,
      edad,
      estado
    })
      .then(() => fetchGallinas())
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1>🐓 Gallinas</h1>

      <div className="grid">
        {gallinas.map(g => (
          <div key={g.id} className="card">

            <h3>{g.codigo}</h3>

            <p><strong>Raza:</strong> {g.raza}</p>
            <p><strong>Edad:</strong> {g.edad} meses</p>

            <p>
              <strong>Estado:</strong>{" "}
              <span style={{
                color:
                  g.estado === 'activa' ? 'green' :
                  g.estado === 'enferma' ? 'orange' :
                  'red'
              }}>
                {g.estado}
              </span>
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-edit" onClick={() => updateGallina(g)}>
                ✏️ Editar
              </button>

              <button className="btn-delete" onClick={() => deleteGallina(g.id)}>
                ❌ Eliminar
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default GallinasPage;