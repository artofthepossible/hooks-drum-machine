import React from 'react';

const Button = ({ held, onMouseDown, onTouchStart, onTouchEnd, onMouseUp, children }) => {
  const buttonStyle = {
    backgroundColor: held ? 'grey' : 'white',
    border: '1px solid black',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  return (
    <button
      style={buttonStyle}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseUp={onMouseUp}
    >
      {children}
    </button>
  );
};

export default Button;