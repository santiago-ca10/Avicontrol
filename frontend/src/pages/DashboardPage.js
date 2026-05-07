import { useEffect, useState } from 'react';
import API from '../services/api';

function DashboardPage() {
  const [gallinas, setGallinas] = useState([]);
  const [produccion, setProduccion] = useState([]);

  useEffect(() => {
    API.get('/gallinas')
      .then(res => setGallinas(res.data))
      .catch(err => console.error(err));

    API.get('/produccion')
      .then(res => setProduccion(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Gallinas que produjeron
  const produjeron = produccion.filter(
    p => p.produjo === 1
  ).length;

  // ❌ Gallinas que NO produjeron
  const noProdujeron = produccion.filter(
    p => p.produjo === 0
  ).length;

  // 📊 Porcentaje de producción
  const porcentaje = produccion.length > 0
    ? Math.round((produjeron / produccion.length) * 100)
    : 0;

  return (
    <div className="container">

      <h1>📊 Dashboard Avícola</h1>

      <div className="grid">

        {/* GALLINAS */}
        <div className="card stat">
          <h2>{gallinas.length}</h2>
          <p>🐓 Gallinas registradas</p>
        </div>

        {/* REGISTROS */}
        <div className="card stat">
          <h2>{produccion.length}</h2>
          <p>📝 Registros diarios</p>
        </div>

        {/* PRODUJERON */}
        <div className="card stat">
          <h2>{produjeron}</h2>
          <p>🥚 Produjeron huevo</p>
        </div>

        {/* NO PRODUJERON */}
        <div className="card stat">
          <h2>{noProdujeron}</h2>
          <p>❌ No produjeron</p>
        </div>

        {/* PORCENTAJE */}
        <div className="card stat">
          <h2>{porcentaje}%</h2>
          <p>📈 Productividad</p>
        </div>

      </div>

    </div>
  );
}

export default DashboardPage;