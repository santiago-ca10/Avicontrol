import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import GallinasPage from './pages/GallinasPage';
import CrearGallinaPage from './pages/CrearGallinaPage';
import ProduccionPage from './pages/ProduccionPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div>

        {/* 🔥 FONDO ANIMADO (BLOBS) */}
        <div className="blob"></div>
        <div className="blob-2"></div>

        <div className="app">

          {/* SIDEBAR */}
          <aside className="sidebar">
            <h2 className="logo">🐓 Avicontrol</h2>

            <nav className="menu">
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => 
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                📊 Dashboard
              </NavLink>

              <NavLink 
                to="/gallinas" 
                className={({ isActive }) => 
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                🐓 Gallinas
              </NavLink>

              <NavLink 
                to="/crear" 
                className={({ isActive }) => 
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                ➕ Crear
              </NavLink>

              <NavLink 
                to="/produccion" 
                className={({ isActive }) => 
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                🥚 Producción
              </NavLink>
            </nav>
          </aside>

          {/* CONTENIDO */}
          <main className="main">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/gallinas" element={<GallinasPage />} />
              <Route path="/crear" element={<CrearGallinaPage />} />
              <Route path="/produccion" element={<ProduccionPage />} />
            </Routes>
          </main>

        </div>
      </div>
    </Router>
  );
}

export default App;