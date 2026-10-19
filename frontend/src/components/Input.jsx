import React from 'react';

const Input = React.forwardRef(({ label, type = 'text', error, className, required, ...props }, ref) => {
  return (
    <div className="form-group" style={{ marginBottom: '14px', width: '100%' }}>
      {label && (
        <label 
          style={{ 
            display: 'block', 
            marginBottom: '6px', 
            fontWeight: 500, 
            fontSize: '13px',
            color: 'var(--text-main, #2c3e50)'
          }}
        >
          {label}
          {required && (
            <span 
              style={{ 
                color: '#e74c3c', 
                marginLeft: '4px', 
                fontWeight: 'bold' 
              }}
              title="Wajib diisi"
            >
              *
            </span>
          )}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea 
          ref={ref} 
          className={`admin-input ${className || ''}`} 
          {...props} 
        />
      ) : (
        <input 
          type={type} 
          ref={ref} 
          className={`admin-input ${className || ''}`} 
          {...props} 
        />
      )}
      {error && (
        <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error.message}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
