import { useEffect, useState } from 'react';
import API from '../services/api';
import GalponForm from '../components/GalponForm';
import ConfirmModal from '../components/ConfirmModal';
import AlertModal from '../components/AlertModal';

// =========================
// BARRA DE OCUPACIÓN
// =========================
function OcupacionBar({ pct }) {
  const color =
    pct >= 90 ? '#dc2626' :
    pct >= 70 ? '#d97706' :
    '#16a34a';

  return (
    <div style={bar.wrap}>
      <div style={{ ...bar.fill, width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}

const bar = {
  wrap: {
    width: '100%',
    height: '8px',
    background: 'var(--border)',
    borderRadius: '999px',
    overflow: 'hidden',
    marginTop: '8px',
  },
  fill: {
    height: '100%',
    borderRadius: '999px',
    transition: 'width 0.4s ease',
  },
};

// =========================
// CARD DE GALPÓN (lista)
// =========================
function GalponCard({ galpon, onSelect, onEdit, onDelete }) {
  const pct = galpon.stats?.ocupacion || 0;
  const ocupColor =
    pct >= 90 ? '#dc2626' :
    pct >= 70 ? '#d97706' :
    '#16a34a';

  return (
    <div
      className="card"
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onClick={() => onSelect(galpon)}
    >
      <div style={gc.header}>
        <h3 style={gc.nombre}>{galpon.nombre}</h3>
        <span style={{ ...gc.badge, color: ocupColor }}>
          {pct}%
        </span>
      </div>

      <p style={gc.info}>
        {galpon.stats?.total_gallinas || 0} / {galpon.capacidad} aves
      </p>

      <OcupacionBar pct={pct} />

      <div style={gc.actions} onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-edit"
          style={gc.btn}
          onClick={() => onEdit(galpon)}
        >
          Editar
        </button>
        <button
          className="btn-delete"
          style={gc.btn}
          onClick={() => onDelete(galpon)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

const gc = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px',
  },
  nombre: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text)',
  },
  badge: {
    fontSize: '13px',
    fontWeight: 700,
  },
  info: {
    margin: '0',
    fontSize: '13px',
    color: 'var(--text-soft)',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    marginTop: '14px',
  },
  btn: {
    fontSize: '13px',
    padding: '7px 14px',
  },
};

// =========================
// PANEL DETALLE GALPÓN
// =========================
function GalponDetalle({ galpon, onClose, onRefresh, onAlert }) {
  const [gallinas, setGallinas] = useState([]);
  const [stats, setStats]       = useState(null);
  const [loading, setLoading]   = useState(true);

  const [confirmModal, setConfirmModal] = useState({
    open: false, gallinaId: null, gallinaNombre: '',
  });

  useEffect(() => {
    fetchDetalle();
  }, [galpon.id]);

  const fetchDetalle = async () => {
    setLoading(true);
    try {
      const [gallinasRes, statsRes] = await Promise.all([
        API.get(`/gallinas?galpon_id=${galpon.id}`),
        API.get(`/galpones/${galpon.id}/stats`),
      ]);
      setGallinas(gallinasRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarGallina = (gallina) => {
    setConfirmModal({
      open: true,
      gallinaId: gallina.id,
      gallinaNombre: gallina.codigo || `Gallina #${gallina.id}`,
    });
  };

  const confirmarEliminarGallina = async () => {
    try {
      await API.delete(`/gallinas/${confirmModal.gallinaId}`);
      onAlert?.({
        title: 'Eliminada',
        message: 'La gallina fue eliminada correctamente.',
        type: 'success',
      });
      fetchDetalle();
      onRefresh?.();
    } catch (err) {
      onAlert?.({
        title: 'Error',
        message: err.response?.data?.message || 'No se pudo eliminar.',
        type: 'error',
      });
    }
  };

  const pct = stats?.ocupacion || 0;
  const ocupColor =
    pct >= 90 ? '#dc2626' :
    pct >= 70 ? '#d97706' :
    '#16a34a';

  return (
    <div>

      {/* HEADER DETALLE */}
      <div style={det.header}>
        <button style={det.backBtn} onClick={onClose}>
          ← Volver
        </button>
        <h2 style={det.titulo}>{galpon.nombre}</h2>
      </div>

      {/* STATS DEL GALPÓN */}
      <div style={det.statsRow}>

        <div className="card" style={det.statBox}>
          <p style={det.statLabel}>Capacidad</p>
          <h3 style={det.statVal}>{galpon.capacidad}</h3>
        </div>

        <div className="card" style={det.statBox}>
          <p style={det.statLabel}>Gallinas</p>
          <h3 style={{ ...det.statVal, color: '#16a34a' }}>
            {stats?.total_gallinas || 0}
          </h3>
        </div>

        <div className="card" style={det.statBox}>
          <p style={det.statLabel}>Ocupación</p>
          <h3 style={{ ...det.statVal, color: ocupColor }}>
            {pct}%
          </h3>
        </div>

      </div>

      {/* BARRA OCUPACIÓN */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-soft)' }}>Ocupación del galpón</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: ocupColor }}>{pct}%</span>
        </div>
        <OcupacionBar pct={pct} />
      </div>

      {/* TABLA GALLINAS */}
      <div className="card">
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600 }}>
          Gallinas en este galpón
        </h3>

        {loading ? (
          <p style={{ color: 'var(--text-soft)', fontSize: '14px' }}>Cargando...</p>
        ) : gallinas.length === 0 ? (
          <p style={{ color: 'var(--text-soft)', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
            No hay gallinas registradas en este galpón.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Raza</th>
                  <th>Fecha ingreso</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {gallinas.map((g) => (
                  <tr key={g.id}>
                    <td style={{ fontWeight: 500 }}>{g.codigo}</td>
                    <td>{g.raza || '—'}</td>
                    <td>
                      {g.fecha_ingreso
                        ? new Date(g.fecha_ingreso).toLocaleDateString()
                        : '—'}
                    </td>
                    <td>
                      <span style={{
                        fontSize: '12px',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        background: g.estado === 'activa'
                          ? 'rgba(22,163,74,0.12)'
                          : 'rgba(100,116,139,0.12)',
                        color: g.estado === 'activa' ? '#16a34a' : '#64748b',
                        fontWeight: 600,
                      }}>
                        {g.estado || 'activa'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn-delete"
                          style={{ fontSize: '13px', padding: '6px 12px' }}
                          onClick={() => handleEliminarGallina(g)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CONFIRM ELIMINAR GALLINA */}
      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, gallinaId: null, gallinaNombre: '' })}
        onConfirm={confirmarEliminarGallina}
        title="Eliminar gallina"
        message="Esta acción eliminará permanentemente la gallina del sistema."
        confirmWord={confirmModal.gallinaNombre}
      />

    </div>
  );
}

const det = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '24px',
  },
  backBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-soft)',
    padding: '8px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  titulo: {
    margin: 0,
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--text)',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '14px',
    marginBottom: '16px',
  },
  statBox: {
    padding: '16px 20px',
    textAlign: 'center',
  },
  statLabel: {
    margin: '0 0 6px',
    fontSize: '12px',
    color: 'var(--text-soft)',
    fontWeight: 500,
  },
  statVal: {
    margin: 0,
    fontSize: '26px',
    fontWeight: 700,
    color: 'var(--text)',
  },
};

// =========================
// PÁGINA PRINCIPAL
// =========================
function GalponesPage() {

  const [galpones, setGalpones]         = useState([]);
  const [galponSeleccionado, setGalponSeleccionado] = useState(null);
  const [galponEditando, setGalponEditando]         = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    open: false, galpon: null,
  });

  const [alertModal, setAlertModal] = useState({
    open: false, title: '', message: '', type: 'info',
  });

  const showAlert = ({ title, message, type }) => {
    setAlertModal({ open: true, title, message, type });
  };

  useEffect(() => {
    fetchGalpones();
  }, []);

  const fetchGalpones = async () => {
    try {
      const res = await API.get('/galpones');
      const conStats = await Promise.all(
        res.data.map(async (g) => {
          const statsRes = await API.get(`/galpones/${g.id}/stats`);
          return { ...g, stats: statsRes.data };
        })
      );
      setGalpones(conStats);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (galpon) => {
    setConfirmModal({ open: true, galpon });
  };

  const handleDeleteConfirm = async () => {
    try {
      await API.delete(`/galpones/${confirmModal.galpon.id}`);
      showAlert({
        title: 'Eliminado',
        message: `"${confirmModal.galpon.nombre}" fue eliminado correctamente.`,
        type: 'success',
      });
      fetchGalpones();
    } catch (err) {
      showAlert({
        title: 'No se puede eliminar',
        message: err.response?.data?.message || 'Error al eliminar el galpón.',
        type: 'error',
      });
    }
  };

  // =========================
  // VISTA DETALLE
  // =========================
  if (galponSeleccionado) {
    return (
      <div className="container">
        <GalponDetalle
          galpon={galponSeleccionado}
          onClose={() => {
            setGalponSeleccionado(null);
            fetchGalpones();
          }}
          onRefresh={fetchGalpones}
          onAlert={showAlert}
        />
        <AlertModal
          isOpen={alertModal.open}
          onClose={() => setAlertModal({ open: false, title: '', message: '', type: 'info' })}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
      </div>
    );
  }

  // =========================
  // VISTA LISTA
  // =========================
  return (
    <div className="container">

      <div className="page-header">
        <h1>Galpones</h1>
        <p>Gestiona tus galpones y consulta las gallinas dentro de cada uno</p>
      </div>

      {/* FORMULARIO CREAR / EDITAR */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <GalponForm
          key={galponEditando?.id ?? 'nuevo'}
          galpon={galponEditando}
          onCreated={() => {
            setGalponEditando(null);
            fetchGalpones();
          }}
          onCancel={() => setGalponEditando(null)}
          onAlert={showAlert}
        />
      </div>

      {/* GRID DE GALPONES */}
      {galpones.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--text-soft)' }}>
            No hay galpones registrados. Crea el primero arriba.
          </p>
        </div>
      ) : (
        <div className="grid">
          {galpones.map((g) => (
            <GalponCard
              key={g.id}
              galpon={g}
              onSelect={setGalponSeleccionado}
              onEdit={(galpon) => {
                setGalponEditando(galpon);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINAR */}
      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, galpon: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar galpón"
        message="Esta acción no se puede deshacer. Solo puedes eliminar galpones sin gallinas."
        confirmWord={confirmModal.galpon?.nombre}
      />

      {/* ALERT MODAL */}
      <AlertModal
        isOpen={alertModal.open}
        onClose={() => setAlertModal({ open: false, title: '', message: '', type: 'info' })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />

    </div>
  );
}

export default GalponesPage;
