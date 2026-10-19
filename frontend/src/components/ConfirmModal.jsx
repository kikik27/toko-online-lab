import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Hapus',
  message = 'Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.',
  confirmText = 'Hapus',
  cancelText = 'Batal',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div style={{ padding: '4px 0 16px' }}>
        <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '14px', lineHeight: 1.6 }}>
          {message}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onClose} 
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button 
          type="button" 
          variant="danger" 
          onClick={onConfirm} 
          disabled={isLoading}
        >
          {isLoading ? 'Menghapus...' : confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
