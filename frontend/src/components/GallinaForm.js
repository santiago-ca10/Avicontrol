import { useState } from 'react';
import API from '../services/api';

/**
 * GallinaForm — registro por lotes
 *
 * Props:
 * - onCreated: callback al guardar
 * - onAlert: ({ title, message, type }) => void
 * - galponFijo: id del galpón (cuando se usa dentro de GalponDetalle)
 * - disponible: espacios disponibles en el galpón (opcional, para mostrar)
 */
function GallinaForm({ onCreated, onAlert, galponFijo = null, disponible = null }) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    raza:          '',
    edad:          '',
    cantidad:      1,
    fecha_ingreso: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.raza.trim()) {
      onAlert?.({ title: 'Campo requerido', message: 'La raza es obligatoria.', type: 'warning' });
      return;
    }

    if (!form.cantidad || form.cantidad < 1) {
      onAlert?.({ title: 'Cantidad inválida', message: 'La cantidad debe ser al menos 1.', type: 'warning' });
      return;
    }

    if (disponible !== null && Number(form.cantidad) > disponible) {
      onAlert?.({
        title: 'Sin espacio',
        message: `El galpón solo tiene ${disponible} lugar(es) disponible(s).`,
        type: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      const res = await API.post('/gallinas', {
        ...form,
        galpon_id: galponFijo,
      });

      onAlert?.({
        title: 'Lote registrado',
        message: `Se registraron ${res.data.insertadas} gallinas correctamente.`,
        type: 'success',
      });

      setForm({
        raza:          '',
        edad:          '',
        cantidad:      1,
        fecha_ingreso: new Date().toISOString().split('T')[0],
      });

      onCreated?.();

    } catch (error) {
      onAlert?.({
        title: 'Error',
        message: error.response?.data?.message || 'No se pudo registrar el lote.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {disponible !== null && (
        <div style={s.disponibleBadge}>
          <span style={s.disponibleText}>
            Espacios disponibles: <strong>{disponible}</strong>
          </span>
        </div>
      )}

      <div style={s.grid}>

        {/* RAZA */}
        <div style={s.field}>
          <label style={s.label}>Raza</label>
          <input
            type="text"
            name="raza"
            placeholder="Ej: ISA Brown"
            value={form.raza}
            onChange={handleChange}
            required
          />
        </div>

        {/* CANTIDAD */}
        <div style={s.field}>
          <label style={s.label}>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            placeholder="Ej: 20"
            value={form.cantidad}
            onChange={handleChange}
            min="1"
            max={disponible ?? undefined}
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
          />
        </div>

        {/* FECHA INGRESO */}
        <div style={s.field}>
          <label style={s.label}>Fecha de ingreso</label>
          <input
            type="date"
            name="fecha_ingreso"
            value={form.fecha_ingreso}
            onChange={handleChange}
          />
        </div>

      </div>

      <button
        type="submit"
        className="btn-save"
        disabled={loading}
        style={{ marginTop: '16px' }}
      >
        {loading
          ? 'Registrando...'
          : `Registrar ${form.cantidad > 1 ? `${form.cantidad} gallinas` : 'gallina'}`}
      </button>

    </form>
  );
}

const s = {
  disponibleBadge: {
    background: 'rgba(22,163,74,0.08)',
    border: '1px solid rgba(22,163,74,0.2)',
    borderRadius: '10px',
    padding: '8px 14px',
    marginBottom: '14px',
    display: 'inline-block',
  },
  disponibleText: {
    fontSize: '13px',
    color: 'var(--text-soft)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
};

export default GallinaForm;
