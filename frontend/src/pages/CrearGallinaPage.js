import GallinaForm from '../components/GallinaForm';

function CrearGallinaPage() {
  return (
    <div className="container">

      <h1>➕ Crear Gallina</h1>

      <div className="grid">

        {/* FORMULARIO */}
        <div className="card">
          <h3>Registro</h3>
          <GallinaForm />
        </div>

        {/* INFO / AYUDA */}
        <div className="card">
          <h3>Información</h3>

          <p>📌 El código debe ser único</p>
          <p>📌 La edad se registra en meses</p>
          <p>📌 La raza se formatea automáticamente</p>

          <hr />

          <p style={{ color: '#6b7280' }}>
            Usa esta sección para registrar nuevas gallinas en el sistema.
          </p>
        </div>

      </div>

    </div>
  );
}

export default CrearGallinaPage;