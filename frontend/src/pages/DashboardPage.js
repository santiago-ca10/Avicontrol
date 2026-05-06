import { useEffect, useState } from 'react';
import API from '../services/api';

function DashboardPage() {
  const [gallinas, setGallinas] = useState([]);
  const [produccion, setProduccion] = useState([]);

  useEffect(() => {
    API.get('/gallinas').then(res => setGallinas(res.data));
    API.get('/produccion').then(res => setProduccion(res.data));
  }, []);

  const totalHuevos = produccion.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <div className="container">
      <h1>📊 Dashboard</h1>

      <div className="grid">
        <div className="card stat">
          <h2>{gallinas.length}</h2>
          <p>Gallinas registradas</p>
        </div>

        <div className="card stat">
          <h2>{produccion.length}</h2>
          <p>Registros de producción</p>
        </div>

        <div className="card stat">
          <h2>{totalHuevos}</h2>
          <p>Total huevos</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;