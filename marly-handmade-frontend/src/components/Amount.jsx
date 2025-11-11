import React from 'react';

const Amount = ({ quantity, setQuantity }) => {
  const incrementar = () => setQuantity(prev => prev + 1);
  
  const decrementar = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button onClick={decrementar}>–</button>
      <input
        type="text"
        value={quantity}
        readOnly
        style={{ width: '40px', textAlign: 'center' }}
      />
      <button onClick={incrementar}>+</button>
    </div>
  );
};

export default Amount;