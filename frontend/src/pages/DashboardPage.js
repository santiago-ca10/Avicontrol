import { useEffect, useState } from 'react';
import API from '../services/api';

function DashboardPage() {

  const [gallinas, setGallinas] = useState([]);
  const [produccion, setProduccion] = useState([]);

  useEffect(() => {

    fetchGallinas();
    fetchProduccion();

  }, []);

  // 🔹 OBTENER GALLINAS
  const fetchGallinas = () => {

    API.get('/gallinas')
      .then(res => setGallinas(res.data))
      .catch(err => console.error(err));
  };

  // 🔹 OBTENER PRODUCCIÓN
  const fetchProduccion = () => {

    API.get('/produccion')
      .then(res => setProduccion(res.data))
      .catch(err => console.error(err));
  };

  // 🔥 TOTALES

  const totalHuevos = produccion.reduce(
    (acc, p) => acc + Number(p.huevos),
    0
  );

  const totalAves = produccion.reduce(
    (acc, p) => acc + Number(p.aves_activas),
    0
  );

  const totalMortalidad = produccion.reduce(
    (acc, p) => acc + Number(p.mortalidad),
    0
  );

  const totalAlimento = produccion.reduce(
    (acc, p) => acc + Number(p.alimento_kg || 0),
    0
  );

  // 📈 PRODUCTIVIDAD
  const productividad =
    totalAves > 0
      ? ((totalHuevos / totalAves) * 100).toFixed(1)
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

        {/* HUEVOS */}
        <div className="card stat">
          <h2>{totalHuevos}</h2>
          <p>🥚 Huevos producidos</p>
        </div>

        {/* AVES */}
        <div className="card stat">
          <h2>{totalAves}</h2>
          <p>🐓 Aves activas</p>
        </div>

        {/* PRODUCTIVIDAD */}
        <div className="card stat">
          <h2>{productividad}%</h2>
          <p>📈 Productividad</p>
        </div>

        {/* MORTALIDAD */}
        <div className="card stat">
          <h2>{totalMortalidad}</h2>
          <p>☠️ Mortalidad</p>
        </div>

        {/* ALIMENTO */}
        <div className="card stat">
          <h2>{totalAlimento} kg</h2>
          <p>🍽️ Alimento consumido</p>
        </div>

      </div>

    </div>
  );
}

export default DashboardPage;