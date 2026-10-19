import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', style = {}, ...props }) => {
  return (
    <button 
      onClick={onClick} 
      className={`btn btn-${variant} ${className}`} 
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
