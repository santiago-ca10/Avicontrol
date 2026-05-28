import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import {
  useEffect,
  useState
} from 'react';

import './index.css';

// COMPONENTS
import Sidebar from './components/Sidebar';

// PAGES
import DashboardPage from './pages/DashboardPage';
import GallinasPage from './pages/GallinasPage';
import CrearGallinaPage from './pages/CrearGallinaPage';
import ProduccionPage from './pages/ProduccionPage';
import GalponesPage from './pages/GalponesPage';

function App() {

  //  DARK MODE
  const [dark, setDark] = useState(false);

  //  SIDEBAR
  const [collapsed, setCollapsed] = useState(false);

  //  CAMBIO TEMA
  useEffect(() => {

    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

  }, [dark]);

  return (

    <Router>

      {/* FONDO */}
      <div className="blob"></div>
      <div className="blob-2"></div>

      <div className="app">

        {/* SIDEBAR */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          dark={dark}
          setDark={setDark}
        />

        {/* MAIN */}
        <main className="main">

          <Routes>

            <Route
              path="/"
              element={<DashboardPage />}
            />

            <Route
              path="/gallinas"
              element={<GallinasPage />}
            />

            <Route
              path="/galpones"
              element={<GalponesPage />}
            />

            <Route
              path="/crear"
              element={<CrearGallinaPage />}
            />

            <Route
              path="/produccion"
              element={<ProduccionPage />}
            />

          </Routes>

        </main>

      </div>

    </Router>
  );
}

export default App;