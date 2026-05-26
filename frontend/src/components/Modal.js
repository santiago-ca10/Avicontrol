import { useEffect } from 'react';
import ReactDOM from 'react-dom';

/**
 * Modal base reutilizable
 * Usa ReactDOM.createPortal para montar el overlay
 * directamente en document.body y evitar errores de DOM.
 *
 * Props:
 * - isOpen: boolean
 * - onClose: función
 * - title: string
 * - children: contenido del modal
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 */
function Modal({ isOpen, onClose, title, children, size = 'md' }) {

  // Cerrar con Escape
  useEffect(() => {

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };

  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: '380px',
    md: '480px',
    lg: '620px',
  };

  const modal = (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{
          ...styles.modal,
          maxWidth: sizeMap[size],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <button style={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );

  // Montar fuera del árbol de React para evitar
  // conflictos de DOM con removeChild
  return ReactDOM.createPortal(modal, document.body);
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
    animation: 'fadeIn 0.18s ease',
  },
  modal: {
    width: '100%',
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
    animation: 'slideUp 0.22s ease',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px 16px',
    borderBottom: '1px solid var(--border)',
  },
  title: {
    margin: 0,
    fontSize: '17px',
    fontWeight: 600,
    color: 'var(--text)',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    color: 'var(--text-soft)',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px',
    lineHeight: 1,
    transition: 'background 0.2s',
  },
  body: {
    padding: '24px',
  },
};

export default Modal;
