import { useEffect, useState } from 'react';
import API from '../services/api';

const formatRaza = (texto) =>
  texto
    .toLowerCase()
    .split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');

/**
 * GallinaForm
 *
 * Props:
 * - onCreated: callback al guardar exitosamente
 * - onAlert: ({ title, message, type }) => void
 * - galponFijo: id del galpón (cuando se usa dentro de GalponDetalle)
 * - gallina: objeto para editar (opcional)
 * - onCancel: callback para cancelar edición
 */
function GallinaForm({
  onCreated,
  onAlert,
  galponFijo = null,
  gallina = null,
  onCancel = null,
}) {

  const editando = !!gallina;

  const [galpones, setGalpones] = useState([]);
  const [loading, setLoading]   = useState(false);

  const [form, setForm] = useState({
    codigo:    gallina?.codigo    ?? '',
    raza:      gallina?.raza      ?? '',
    edad:      gallina?.edad      ?? '',
    estado:    gallina?.estado    ?? 'activa',
    galpon_id: galponFijo ?? gallina?.galpon_id ?? '',
  });

  useEffect(() => {
    if (!galponFijo) fetchGalpones();
  }, [galponFijo]);

  const fetchGalpones = () => {
    API.get('/galpones')
      .then(res => setGalpones(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'edad' && value < 0) return;
    if (name === 'raza') value = formatRaza(value);
    if (name === 'codigo') value = value.toUpperCase();

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.codigo || !form.raza || form.edad === '' || !form.galpon_id) {
      onAlert?.({
        title: 'Campos incompletos',
        message: 'Completa todos los campos obligatorios.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);

    try {

      if (editando) {
        await API.put(`/gallinas/${gallina.id}`, form);
        onAlert?.({
          title: 'Actualizada',
          message: `La gallina "${form.codigo}" fue actualizada correctamente.`,
          type: 'success',
        });
      } else {
        await API.post('/gallinas', form);
        onAlert?.({
          title: 'Registrada',
          message: `La gallina "${form.codigo}" fue registrada correctamente.`,
          type: 'success',
        });
        setForm({
          codigo: '',
          raza: '',
          edad: '',
          estado: 'activa',
          galpon_id: galponFijo ?? '',
        });
      }

      onCreated?.();

    } catch (error) {
      onAlert?.({
        title: 'Error',
        message: error.response?.data?.message || 'Error al guardar la gallina.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const galponSeleccionado = galpones.find(
    g => g.id === Number(form.galpon_id)
  );

  return (
    <form onSubmit={handleSubmit}>

      <h3 style={s.title}>
        {editando ? 'Editar Gallina' : 'Registrar Gallina'}
      </h3>

      <div style={s.grid}>

        {/* CÓDIGO */}
        <div style={s.field}>
          <label style={s.label}>Código</label>
          <input
            type="text"
            name="codigo"
            placeholder="Ej: G-001"
            value={form.codigo}
            onChange={handleChange}
            required
            disabled={editando}
            style={editando ? { opacity: 0.6 } : {}}
          />
        </div>

        {/* RAZA */}
        <div style={s.field}>
          <label style={s.label}>Raza</label>
          <input
            type="text"
            name="raza"
            placeholder="Ej: Isa Brown"
            value={form.raza}
            onChange={handleChange}
            required
          />
        </div>

        {/* EDAD */}
        <div style={s.field}>
          <label style={s.label}>Edad (meses)</label>
          <input
            type="number"
            name="edad"
            placeholder="0"
            value={form.edad}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* ESTADO — solo al editar */}
        {editando && (
          <div style={s.field}>
            <label style={s.label}>Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
            >
              <option value="activa">Activa</option>
              <option value="enferma">Enferma</option>
              <option value="vendida">Vendida</option>
            </select>
          </div>
        )}

        {/* GALPÓN — solo si no está fijo */}
        {!galponFijo && (
          <div style={{ ...s.field, gridColumn: '1 / -1' }}>
            <label style={s.label}>Galpón</label>
            <select
              name="galpon_id"
              value={form.galpon_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un galpón</option>
              {galpones.map(g => {
                const total    = Number(g.total_gallinas || 0);
                const capacidad = Number(g.capacidad || 0);
                const lleno    = total >= capacidad;
                return (
                  <option key={g.id} value={g.id} disabled={lleno}>
                    {g.nombre} — {total}/{capacidad}{lleno ? ' (Lleno)' : ''}
                  </option>
                );
              })}
            </select>
          </div>
        )}

      </div>

      {/* INFO GALPÓN (cuando no está fijo) */}
      {galponSeleccionado && !galponFijo && (
        <div
          className="card"
          style={{
            marginTop: '14px',
            padding: '14px 16px',
            background: 'rgba(22,163,74,0.07)',
            border: '1px solid rgba(22,163,74,0.2)',
          }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '13px', color: 'var(--primary)' }}>
            {galponSeleccionado.nombre}
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-soft)' }}>
            {galponSeleccionado.total_gallinas || 0} / {galponSeleccionado.capacidad} aves
            &nbsp;·&nbsp; {galponSeleccionado.ocupacion || 0}% ocupación
          </p>
        </div>
      )}

      {/* ACCIONES */}
      <div style={s.actions}>
        <button
          type="submit"
          className="btn-save"
          disabled={loading}
        >
          {loading
            ? 'Guardando...'
            : editando
              ? 'Actualizar'
              : 'Registrar gallina'}
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        )}
      </div>

    </form>
  );
}

const s = {
  title: {
    margin: '0 0 16px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-soft)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '16px',
  },
};

export default GallinaForm;
