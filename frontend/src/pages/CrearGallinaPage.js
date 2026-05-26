import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CrearGallinaPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/galpones');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">

      <div className="page-header">
        <h1>Crear Gallina</h1>
        <p>Redirigiendo a Galpones...</p>
      </div>

      <div
        className="card"
        style={{
          textAlign: 'center',
          padding: '48px 32px',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px', lineHeight: 1 }}>
          🏠
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>
          Las gallinas se registran desde Galpones
        </h3>

        <p style={{
          color: 'var(--text-soft)',
          fontSize: '14px',
          lineHeight: 1.65,
          margin: '0 0 24px',
        }}>
          Entra al galpón donde quieres registrar la gallina
          y usa el botón "Nueva gallina" desde ahí.
        </p>

        <button
          className="btn-save"
          onClick={() => navigate('/galpones')}
        >
          Ir a Galpones
        </button>

      </div>

    </div>
  );
}

export default CrearGallinaPage;