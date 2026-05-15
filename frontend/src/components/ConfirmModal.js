import { useState, useEffect } from 'react';
import Modal from './Modal';

/**
 * Modal de confirmación con texto escrito
 *
 * Props:
 * - isOpen: boolean
 * - onClose: función
 * - onConfirm: función que se ejecuta al confirmar
 * - title: string — título del modal
 * - message: string — descripción del peligro
 * - confirmWord: string — palabra que debe escribirse para confirmar
 * - confirmLabel: string — texto del botón de confirmación (default: 'Eliminar')
 * - danger: boolean — si true, botón confirmar es rojo (default: true)
 *
 * Ejemplo:
 * <ConfirmModal
 *   isOpen={modalOpen}
 *   onClose={() => setModalOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Eliminar producción"
 *   message="Esta acción no se puede deshacer."
 *   confirmWord={nombreGalpon}
 * />
 */
function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = 'Esta acción no se puede deshacer.',
  confirmWord,
  confirmLabel = 'Eliminar',
  danger = true,
}) {

  const [inputValue, setInputValue] = useState('');
  const isMatch = inputValue.trim().toLowerCase() === confirmWord?.trim().toLowerCase();

  // Limpiar input cuando se abre/cierra
  useEffect(() => {
    if (!isOpen) setInputValue('');
  }, [isOpen]);

  const handleConfirm = () => {
    if (!isMatch) return;
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">

      {/* MENSAJE */}
      <p style={styles.message}>{message}</p>

      {/* INSTRUCCIÓN */}
      {confirmWord && (
        <>
          <p style={styles.instruction}>
            Escribe{' '}
            <strong style={styles.keyword}>"{confirmWord}"</strong>{' '}
            para confirmar:
          </p>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Escribe: ${confirmWord}`}
            autoFocus
            style={{
              ...styles.input,
              borderColor: inputValue
                ? isMatch
                  ? '#16a34a'
                  : '#ef4444'
                : 'var(--border)',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isMatch) handleConfirm();
            }}
          />
        </>
      )}

      {/* BOTONES */}
      <div style={styles.actions}>

        <button style={styles.cancelBtn} onClick={onClose}>
          Cancelar
        </button>

        <button
          style={{
            ...styles.confirmBtn,
            background: danger
              ? isMatch
                ? 'linear-gradient(135deg, #dc2626, #ef4444)'
                : 'rgba(239,68,68,0.3)'
              : isMatch
                ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                : 'rgba(22,163,74,0.3)',
            cursor: isMatch ? 'pointer' : 'not-allowed',
          }}
          onClick={handleConfirm}
          disabled={confirmWord ? !isMatch : false}
        >
          {confirmLabel}
        </button>

      </div>

    </Modal>
  );
}

const styles = {
  message: {
    margin: '0 0 16px',
    color: 'var(--text-soft)',
    fontSize: '14px',
    lineHeight: 1.6,
  },
  instruction: {
    margin: '0 0 10px',
    fontSize: '14px',
    color: 'var(--text)',
  },
  keyword: {
    color: '#dc2626',
    fontWeight: 600,
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '12px',
    border: '1.5px solid var(--border)',
    background: 'rgba(255,255,255,0.6)',
    color: 'var(--text)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    marginBottom: '0',
    fontFamily: 'inherit',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  cancelBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-soft)',
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: 500,
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  confirmBtn: {
    color: 'white',
    padding: '10px 22px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '14px',
    border: 'none',
    transition: 'background 0.2s, transform 0.2s',
    fontFamily: 'inherit',
  },
};

export default ConfirmModal;