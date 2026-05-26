import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * GallinasPage — redirige a Galpones
 *
 * La gestión de gallinas ahora vive dentro
 * de cada galpón. Esta página redirige
 * automáticamente para mantener compatibilidad
 * con cualquier enlace existente.
 */
function GallinasPage() {

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
        <h1>Gallinas</h1>
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
        <div style={{
          fontSize: '48px',
          marginBottom: '16px',
          lineHeight: 1,
        }}>
          🏠
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>
          Las gallinas ahora viven en Galpones
        </h3>

        <p style={{
          color: 'var(--text-soft)',
          fontSize: '14px',
          lineHeight: 1.65,
          margin: '0 0 24px',
        }}>
          Para ver, registrar o gestionar gallinas,
          entra a un galpón y encontrarás todas las
          gallinas que pertenecen a él.
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

export default GallinasPage;