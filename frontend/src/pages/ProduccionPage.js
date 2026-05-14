import { useEffect, useState } from 'react';
import API from '../services/api';

function ProduccionPage() {

  const [galpones, setGalpones] = useState([]);
  const [produccion, setProduccion] = useState([]);

  const [galponActual, setGalponActual] =
    useState(null);

  const [form, setForm] = useState({

    galpon_id: '',

    fecha: new Date()
      .toISOString()
      .split('T')[0],

    huevos: '',

    aves_activas: '',

    mortalidad: 0,

    alimento_kg: '',

    observaciones: ''

  });

  useEffect(() => {

    fetchGalpones();
    fetchProduccion();

  }, []);

  // =========================
  // OBTENER GALPONES
  // =========================
  const fetchGalpones = () => {

    API.get('/galpones')
      .then(res => setGalpones(res.data))
      .catch(err => console.error(err));

  };

  // =========================
  // OBTENER PRODUCCIÓN
  // =========================
  const fetchProduccion = () => {

    API.get('/produccion')
      .then(res => setProduccion(res.data))
      .catch(err => console.error(err));

  };

  // =========================
  // CAMBIOS FORM
  // =========================
  const handleChange = async (e) => {

    const {
      name,
      value
    } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    // AUTO CARGAR ESTADÍSTICAS
    if (
      name === 'galpon_id' &&
      value
    ) {

      try {

        const res = await API.get(
          `/galpones/${value}/stats`
        );

        setGalponActual(res.data);

        setForm(prev => ({
          ...prev,
          galpon_id: value,
          aves_activas:
            res.data.total_gallinas
        }));

      } catch (error) {

        console.error(error);

      }

    }

  };

  // =========================
  // ELIMINAR
  // =========================
  const handleDelete = async (id) => {

    const confirmacion =
      window.confirm(
        '¿Eliminar producción?'
      );

    if (!confirmacion) return;

    try {

      await API.delete(
        `/produccion/${id}`
      );

      fetchProduccion();

    } catch (error) {

      console.error(error);

    }

  };

  // =========================
  // GUARDAR
  // =========================
  const handleSubmit = (e) => {

    e.preventDefault();

    // VALIDACIÓN
    if (
      Number(form.huevos) >
      Number(form.aves_activas)
    ) {

      alert(
        'Los huevos no pueden superar las aves activas'
      );

      return;

    }

    API.post('/produccion', form)

      .then(() => {

        alert(
          'Producción registrada correctamente'
        );

        setForm({

          galpon_id: '',

          fecha: new Date()
            .toISOString()
            .split('T')[0],

          huevos: '',

          aves_activas: '',

          mortalidad: 0,

          alimento_kg: '',

          observaciones: ''

        });

        setGalponActual(null);

        fetchProduccion();

      })

      .catch(err => console.error(err));

  };

  return (

    <div className="container">

      <h1>
        Producción Diaria
      </h1>

      <div className="grid">

        {/* ========================= */}
        {/* FORMULARIO */}
        {/* ========================= */}
        <div className="card">

          <h3>
            Registrar Producción
          </h3>

          <form onSubmit={handleSubmit}>

            {/* GALPÓN */}
            <select
              name="galpon_id"
              value={form.galpon_id}
              onChange={handleChange}
              required
            >

              <option value="">
                Seleccione galpón
              </option>

              {
                galpones.map(g => (

                  <option
                    key={g.id}
                    value={g.id}
                  >
                    {g.nombre}
                  </option>

                ))
              }

            </select>

            {/* INFO AUTOMÁTICA */}
            {
              galponActual && (

                <div
                  className="card"
                  style={{
                    marginTop: 15,
                    marginBottom: 15
                  }}
                >

                  <h4>
                    Información del Galpón
                  </h4>

                  <p>
                    Capacidad:
                    {' '}
                    {galponActual.capacidad}
                  </p>

                  <p>
                    Gallinas registradas:
                    {' '}
                    {galponActual.total_gallinas}
                  </p>

                  <p>
                    Ocupación:
                    {' '}
                    {galponActual.ocupacion}%
                  </p>

                </div>

              )
            }

            {/* FECHA */}
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              required
            />

            {/* HUEVOS */}
            <input
              type="number"
              name="huevos"
              placeholder="Huevos producidos"
              value={form.huevos}
              onChange={handleChange}
              required
            />

            {/* AVES ACTIVAS */}
            <input
              type="number"
              name="aves_activas"
              value={form.aves_activas}
              readOnly
            />

            {/* MORTALIDAD */}
            <input
              type="number"
              name="mortalidad"
              placeholder="Mortalidad"
              value={form.mortalidad}
              onChange={handleChange}
            />

            {/* ALIMENTO */}
            <input
              type="number"
              step="0.01"
              name="alimento_kg"
              placeholder="Alimento (kg)"
              value={form.alimento_kg}
              onChange={handleChange}
            />

            {/* OBSERVACIONES */}
            <input
              type="text"
              name="observaciones"
              placeholder="Observaciones"
              value={form.observaciones}
              onChange={handleChange}
            />

            <button className="btn-save">
              Guardar
            </button>

          </form>

        </div>

      </div>

      {/* ========================= */}
      {/* HISTORIAL */}
      {/* ========================= */}
      <h2 style={{ marginTop: 30 }}>
        Historial de Producción
      </h2>

      <div
        className="card"
        style={{ marginTop: 20 }}
      >

        <table className="table">

          <thead>

            <tr>

              <th>Galpón</th>

              <th>Fecha</th>

              <th>Huevos</th>

              <th>Aves</th>

              <th>Productividad</th>

              <th>Mortalidad</th>

              <th>Alimento</th>

              <th>
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {
              produccion.map(p => {

                const productividad =
                  (
                    (p.huevos / p.aves_activas) * 100
                  ).toFixed(1);

                return (

                  <tr key={p.id}>

                    <td>
                      {p.galpon}
                    </td>

                    <td>
                      {
                        new Date(p.fecha)
                          .toLocaleDateString()
                      }
                    </td>

                    <td>
                      {p.huevos}
                    </td>

                    <td>
                      {p.aves_activas}
                    </td>

                    <td>
                      {productividad}%
                    </td>

                    <td>
                      {p.mortalidad}
                    </td>

                    <td>
                      {p.alimento_kg || 0} kg
                    </td>

                    <td>

                      <button
                        className="btn-edit"
                      >
                        Editar
                      </button>

                      <button
                        className="btn-delete"
                        style={{
                          marginLeft: 10
                        }}
                        onClick={() =>
                          handleDelete(p.id)
                        }
                      >
                        Eliminar
                      </button>

                    </td>

                  </tr>

                );

              })
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ProduccionPage;