import { useEffect, useState } from 'react';
import API from '../services/api';
import ConfirmModal from '../components/ConfirmModal';
import AlertModal from '../components/AlertModal';

function ProduccionPage() {

  const [galpones, setGalpones] = useState([]);
  const [produccion, setProduccion] = useState([]);
  const [galponActual, setGalponActual] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  // Estado de modales
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    id: null,
    galponNombre: '',
  });

  const [alertModal, setAlertModal] = useState({
    open: false,
    title: '',
    message: '',
    type: 'info',
  });

  const [form, setForm] = useState({
    galpon_id: '',
    fecha: new Date().toISOString().split('T')[0],
    huevos: '',
    aves_activas: '',
    alimento_kg: '',
    observaciones: '',
  });

  useEffect(() => {
    fetchGalpones();
    fetchProduccion();
  }, []);

  // =========================
  // HELPERS MODALES
  // =========================
  const showAlert = (title, message, type = 'info') => {
    setAlertModal({ open: true, title, message, type });
  };

  const resetForm = () => {
    setForm({
      galpon_id: '',
      fecha: new Date().toISOString().split('T')[0],
      huevos: '',
      aves_activas: '',
      mortalidad: 0,
      alimento_kg: '',
      observaciones: '',
    });
    setGalponActual(null);
    setEditandoId(null);
  };

  // =========================
  // OBTENER GALPONES
  // =========================
  const fetchGalpones = () => {
    API.get('/galpones')
      .then((res) => setGalpones(res.data))
      .catch((err) => console.error(err));
  };

  // =========================
  // OBTENER PRODUCCIÓN
  // =========================
  const fetchProduccion = () => {
    API.get('/produccion')
      .then((res) => setProduccion(res.data))
      .catch((err) => console.error(err));
  };

  // =========================
  // CAMBIOS FORM
  // =========================
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === 'galpon_id' && value) {
      try {
        const res = await API.get(`/galpones/${value}/stats`);
        setGalponActual(res.data);
        setForm((prev) => ({
          ...prev,
          galpon_id: value,
          aves_activas: res.data.total_gallinas,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // =========================
  // ABRIR MODAL ELIMINAR
  // =========================
  const handleDeleteClick = (p) => {
    const galpon = galpones.find((g) => g.id === p.galpon_id);
    setConfirmModal({
      open: true,
      id: p.id,
      galponNombre: galpon?.nombre || p.galpon || 'este registro',
    });
  };

  // =========================
  // CONFIRMAR ELIMINAR
  // =========================
  const handleDeleteConfirm = async () => {
    try {
      await API.delete(`/produccion/${confirmModal.id}`);
      fetchProduccion();
      showAlert('Eliminado', 'El registro de producción fue eliminado.', 'success');
    } catch (error) {
      console.error(error);
      showAlert('Error', 'No se pudo eliminar el registro. Intenta de nuevo.', 'error');
    }
  };

  // =========================
  // EDITAR
  // =========================
  const handleEdit = async (p) => {
    setEditandoId(p.id);
    setForm({
      galpon_id: p.galpon_id,
      fecha: p.fecha.split('T')[0],
      huevos: p.huevos,
      aves_activas: p.aves_activas,
      mortalidad: p.mortalidad,
      alimento_kg: p.alimento_kg,
      observaciones: p.observaciones || '',
    });

    try {
      const res = await API.get(`/galpones/${p.galpon_id}/stats`);
      setGalponActual(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // GUARDAR / ACTUALIZAR
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.huevos) > Number(form.aves_activas)) {
      showAlert(
        'Validación',
        'Los huevos producidos no pueden superar las aves activas del galpón.',
        'warning'
      );
      return;
    }

    try {
      if (editandoId) {
        await API.put(`/produccion/${editandoId}`, form);
        showAlert('Actualizado', 'La producción fue actualizada correctamente.', 'success');
      } else {
        await API.post('/produccion', form);
        showAlert('Registrado', 'La producción fue registrada correctamente.', 'success');
      }

      resetForm();
      fetchProduccion();
    } catch (error) {
      console.error(error);
      showAlert('Error', 'Ocurrió un error al guardar. Intenta de nuevo.', 'error');
    }
  };

  return (
    <div className="container">

      <div className="page-header">
        <h1>Producción Diaria</h1>
        <p>Registra y consulta la producción de huevos por galpón</p>
      </div>

      <div className="grid">

        {/* FORMULARIO */}
        <div className="card">

          <h3 style={{ marginBottom: '16px' }}>
            {editandoId ? 'Editar Producción' : 'Registrar Producción'}
          </h3>

          <form onSubmit={handleSubmit} style={formStyles.form}>

            {/* GALPÓN */}
            <div style={formStyles.field}>
              <label style={formStyles.label}>Galpón</label>
              <select
                name="galpon_id"
                value={form.galpon_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un galpón</option>
                {galpones.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* INFO AUTOMÁTICA */}
            {galponActual && (
              <div
                className="card"
                style={{
                  padding: '14px 16px',
                  background: 'rgba(22,163,74,0.07)',
                  border: '1px solid rgba(22,163,74,0.2)',
                }}
              >
                <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '13px', color: 'var(--primary)' }}>
                  Información del Galpón
                </p>
                <p style={{ margin: '2px 0', fontSize: '13px' }}>
                  Capacidad: <strong>{galponActual.capacidad}</strong>
                </p>
                <p style={{ margin: '2px 0', fontSize: '13px' }}>
                  Gallinas activas: <strong>{galponActual.total_gallinas}</strong>
                </p>
                <p style={{ margin: '2px 0', fontSize: '13px' }}>
                  Ocupación: <strong>{galponActual.ocupacion}%</strong>
                </p>
              </div>
            )}

            {/* FECHA */}
            <div style={formStyles.field}>
              <label style={formStyles.label}>Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </div>

            {/* FILA: HUEVOS + AVES */}
            <div style={formStyles.row}>
              <div style={formStyles.field}>
                <label style={formStyles.label}>Huevos producidos</label>
                <input
                  type="number"
                  name="huevos"
                  placeholder="0"
                  value={form.huevos}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div style={formStyles.field}>
                <label style={formStyles.label}>Aves activas</label>
                <input
                  type="number"
                  name="aves_activas"
                  value={form.aves_activas}
                  readOnly
                  style={{ opacity: 0.65 }}
                />
              </div>
            </div>

            {/* ALIMENTO */}
            <div style={formStyles.field}>
              <label style={formStyles.label}>Alimento (kg)</label>
              <input
                type="number"
                step="0.01"
                name="alimento_kg"
                placeholder="0.00"
                value={form.alimento_kg}
                onChange={handleChange}
                min="0"
              />
            </div>

            {/* OBSERVACIONES */}
            <div style={formStyles.field}>
              <label style={formStyles.label}>Observaciones</label>
              <input
                type="text"
                name="observaciones"
                placeholder="Opcional..."
                value={form.observaciones}
                onChange={handleChange}
              />
            </div>

            {/* ACCIONES */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button type="submit" className="btn-save">
                {editandoId ? 'Actualizar' : 'Guardar'}
              </button>

              {editandoId && (
                <button type="button" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>

          </form>

        </div>

      </div>

      {/* HISTORIAL */}
      <h2 style={{ marginTop: '30px', marginBottom: '16px' }}>
        Historial de Producción
      </h2>

      <div className="card" style={{ marginTop: '0', overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Galpón</th>
              <th>Fecha</th>
              <th>Huevos</th>
              <th>Aves</th>
              <th>Productividad</th>
              <th>Alimento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {produccion.map((p) => {
              const productividad = (
                (p.huevos / p.aves_activas) * 100
              ).toFixed(1);

              return (
                <tr key={p.id}>
                  <td>{p.galpon}</td>
                  <td>{new Date(p.fecha).toLocaleDateString()}</td>
                  <td>{p.huevos}</td>
                  <td>{p.aves_activas}</td>
                  <td>{productividad}%</td>
                  <td>{p.mortalidad}</td>
                  <td>{p.alimento_kg || 0} kg</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(p)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteClick(p)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL CONFIRMAR ELIMINAR */}
      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, id: null, galponNombre: '' })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar registro de producción"
        message="Esta acción no se puede deshacer. Se eliminará permanentemente el registro de producción."
        confirmWord={confirmModal.galponNombre}
      />

      {/* MODAL ALERTA */}
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

const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-soft)',
  },
  row: {
    display: 'flex',
    gap: '12px',
  },
};

export default ProduccionPage;
