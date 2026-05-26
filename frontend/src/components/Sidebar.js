import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  House,
  Egg,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';

const menuItems = [
  { to: '/',          end: true,  icon: LayoutDashboard, label: 'Dashboard'   },
  { to: '/galpones',  end: false, icon: House,            label: 'Galpones'    },
  { to: '/produccion',end: false, icon: Egg,              label: 'Producción'  },
];

function Sidebar({ collapsed, setCollapsed, dark, setDark }) {

  return (
    <aside className={collapsed ? 'sidebar collapsed' : 'sidebar'}>

      {/* TOP */}
      <div className="sidebar-top">

        {!collapsed && (
          <span style={s.logo}>Avicontrol</span>
        )}

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          style={s.collapseBtn}
          title={collapsed ? 'Expandir' : 'Colapsar'}
        >
          {collapsed
            ? <ChevronRight size={18} />
            : <ChevronLeft size={18} />
          }
        </button>

      </div>

      {/* MENU */}
      <nav className="menu">
        {menuItems.map(({ to, end, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? 'menu-item active' : 'menu-item'
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={20} strokeWidth={1.8} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM */}
      <div className="sidebar-bottom">
        <button
          className="btn-save"
          onClick={() => setDark(!dark)}
          style={s.themeBtn}
          title={dark ? 'Modo claro' : 'Modo oscuro'}
        >
          {dark
            ? <Sun size={17} strokeWidth={1.8} />
            : <Moon size={17} strokeWidth={1.8} />
          }
          {!collapsed && (dark ? ' Claro' : ' Oscuro')}
        </button>
      </div>

    </aside>
  );
}

const s = {
  logo: {
    fontSize: '17px',
    fontWeight: 700,
    color: 'var(--primary)',
    letterSpacing: '-0.3px',
  },
  collapseBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-soft)',
  },
  themeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    justifyContent: collapsed => collapsed ? 'center' : 'flex-start',
  },
};

export default Sidebar;
