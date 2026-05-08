import { NavLink } from 'react-router-dom';

function Sidebar({
  collapsed,
  setCollapsed,
  dark,
  setDark
}) {

  return (

    <aside
      className={
        collapsed
          ? 'sidebar collapsed'
          : 'sidebar'
      }
    >

      {/* TOP */}
      <div className="sidebar-top">

        <h2 className="logo">
          {collapsed ? '🐓' : '🐓 Avicontrol'}
        </h2>

        <button
          className="collapse-btn"
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >
          {collapsed ? '➡️' : '⬅️'}
        </button>

      </div>

      {/* MENU */}
      <nav className="menu">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <span>📊</span>

          {!collapsed && 'Dashboard'}
        </NavLink>

        <NavLink
          to="/gallinas"
          className={({ isActive }) =>
            isActive
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <span>🐓</span>

          {!collapsed && 'Gallinas'}
        </NavLink>

        <NavLink
          to="/galpones"
          className={({ isActive }) =>
            isActive
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <span>🏠</span>

          {!collapsed && 'Galpones'}
        </NavLink>

        <NavLink
          to="/crear"
          className={({ isActive }) =>
            isActive
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <span>➕</span>

          {!collapsed && 'Crear'}
        </NavLink>

        <NavLink
          to="/produccion"
          className={({ isActive }) =>
            isActive
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <span>🥚</span>

          {!collapsed && 'Producción'}
        </NavLink>

      </nav>

      {/* BOTONES */}
      <div className="sidebar-bottom">

        <button
          className="btn-save"
          onClick={() => setDark(!dark)}
        >
          {dark ? '☀️' : '🌙'}

          {!collapsed &&
            (dark
              ? ' Claro'
              : ' Oscuro')}
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;