import { useEffect, useState } from 'react';

import API from '../services/api';

import GalponForm from '../components/GalponForm';

function GalponesPage() {

  const [galpones, setGalpones] = useState([]);

  // =========================
  // OBTENER GALPONES + STATS
  // =========================
  const fetchGalpones = async () => {

    try {

      // 🔹 obtener galpones
      const galponesRes =
        await API.get('/galpones');

      const galponesData =
        galponesRes.data;

      // 🔹 obtener stats de cada galpón
      const galponesConStats =
        await Promise.all(

          galponesData.map(async (g) => {

            const statsRes =
              await API.get(
                `/galpones/${g.id}/stats`
              );

            return {
              ...g,
              stats: statsRes.data
            };

          })

        );

      setGalpones(galponesConStats);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchGalpones();

  }, []);

  return (

    <div className="container">

      <h1>
        Gestión de Galpones
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

            <h2>
              {g.nombre}
            </h2>

            <p>
              Capacidad:
              {' '}
              {g.capacidad}
            </p>

            <p>
              Gallinas:
              {' '}
              {g.stats?.total_gallinas || 0}
            </p>

            <p>
              Ocupación:
              {' '}
              {g.stats?.ocupacion || 0}%
            </p>

            {/* BARRA */}
            <div
              style={{
                width: '100%',
                height: 10,
                background: '#e2e8f0',
                borderRadius: 999,
                overflow: 'hidden',
                marginTop: 10
              }}
            >

              <div
                style={{
                  width: `${g.stats?.ocupacion || 0}%`,
                  height: '100%',
                  background: '#16a34a'
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default GalponesPage;