import Modal from './Modal';

/**
 * Modal de alerta — reemplaza alert()
 *
 * Props:
 * - isOpen: boolean
 * - onClose: función
 * - title: string
 * - message: string
 * - type: 'success' | 'error' | 'warning' | 'info' (default: 'info')
 *
 * Ejemplo:
 * <AlertModal
 *   isOpen={alert.open}
 *   onClose={() => setAlert({ open: false })}
 *   title="Producción registrada"
 *   message="El registro fue guardado correctamente."
 *   type="success"
 * />
 */
function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
}) {

  const config = {
    success: {
      icon: '✓',
      color: '#16a34a',
      bg: 'rgba(22,163,74,0.1)',
      label: 'Entendido',
    },
    error: {
      icon: '✕',
      color: '#dc2626',
      bg: 'rgba(220,38,38,0.1)',
      label: 'Cerrar',
    },
    warning: {
      icon: '!',
      color: '#d97706',
      bg: 'rgba(217,119,6,0.1)',
      label: 'Entendido',
    },
    info: {
      icon: 'i',
      color: '#2563eb',
      bg: 'rgba(37,99,235,0.1)',
      label: 'Entendido',
    },
  };

  const { icon, color, bg, label } = config[type] || config.info;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">

      {/* ICONO + MENSAJE */}
      <div style={styles.content}>

        <div style={{ ...styles.iconBadge, background: bg, color }}>
          <span style={styles.iconText}>{icon}</span>
        </div>

        <p style={styles.message}>{message}</p>

      </div>

      {/* BOTÓN */}
      <div style={styles.actions}>
        <button
          style={{
            ...styles.btn,
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          }}
          onClick={onClose}
          autoFocus
        >
          {label}
        </button>
      </div>

    </Modal>
  );
}

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '14px',
    padding: '8px 0',
  },
  iconBadge: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: 1,
  },
  message: {
    margin: 0,
    color: 'var(--text-soft)',
    fontSize: '14px',
    lineHeight: 1.65,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  btn: {
    color: 'white',
    padding: '10px 32px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'transform 0.2s',
  },
};

export default AlertModal;
