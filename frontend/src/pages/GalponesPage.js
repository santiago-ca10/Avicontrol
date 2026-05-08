import { useEffect, useState } from 'react';

import API from '../services/api';

import GalponForm from '../components/GalponForm';

function GalponesPage() {

  const [galpones, setGalpones] = useState([]);

  // 🔹 OBTENER GALPONES
  const fetchGalpones = () => {

    API.get('/galpones')
      .then(res => setGalpones(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {

    fetchGalpones();

  }, []);

  return (

    <div className="container">

      <h1>
        🏠 Gestión de Galpones
      </h1>

      {/* FORM */}
      <div className="card">

        <GalponForm
          onCreated={fetchGalpones}
        />

      </div>

      {/* LISTA */}
      <div
        className="grid"
        style={{ marginTop: 20 }}
      >

        {galpones.map(g => (

          <div
            key={g.id}
            className="card"
          >

            <h3>
              🏠 {g.nombre}
            </h3>

            <p>
              🐓 Capacidad:
              {' '}
              {g.capacidad}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default GalponesPage;