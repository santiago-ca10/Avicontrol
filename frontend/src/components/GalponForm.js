import { useState } from 'react';
import API from '../services/api';

/**
 * GalponForm
 *
 * Props:
 * - onCreated: callback cuando se crea/edita exitosamente
 * - onAlert: ({ title, message, type }) => void  — para mostrar AlertModal desde el padre
 * - galpon: objeto para editar (opcional)
 * - onCancel: callback para cancelar edición (opcional)
 */
function GalponForm({
  onCreated,
  onAlert,
  galpon = null,
  onCancel = null,
}) {

  const editando = !!galpon;

  const [form, setForm] = useState({
    nombre:   galpon?.nombre   ?? '',
    capacidad: galpon?.capacidad ?? '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.capacidad) {
      onAlert?.({
        title: 'Campos incompletos',
        message: 'El nombre y la capacidad son obligatorios.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);

    try {

      if (editando) {
        await API.put(`/galpones/${galpon.id}`, form);
        onAlert?.({
          title: 'Galpón actualizado',
          message: `"${form.nombre}" fue actualizado correctamente.`,
          type: 'success',
        });
      } else {
        await API.post('/galpones', form);
        onAlert?.({
          title: 'Galpón creado',
          message: `"${form.nombre}" fue creado correctamente.`,
          type: 'success',
        });
        setForm({ nombre: '', capacidad: '' });
      }

      onCreated?.();

    } catch (err) {
      onAlert?.({
        title: 'Error',
        message: err.response?.data?.message || 'Ocurrió un error al guardar.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h3 style={s.title}>
        {editando ? 'Editar Galpón' : 'Nuevo Galpón'}
      </h3>

      <div style={s.fields}>

        <div style={s.field}>
          <label style={s.label}>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej: Galpón A"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div style={s.field}>
          <label style={s.label}>Capacidad de aves</label>
          <input
            type="number"
            name="capacidad"
            placeholder="Ej: 500"
            value={form.capacidad}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

      </div>

      <div style={s.actions}>
        <button
          type="submit"
          className="btn-save"
          disabled={loading}
        >
          {loading ? 'Guardando...' : editando ? 'Actualizar' : 'Crear galpón'}
        </button>

        {editando && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
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
  fields: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    minWidth: '160px',
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

export default GalponForm;