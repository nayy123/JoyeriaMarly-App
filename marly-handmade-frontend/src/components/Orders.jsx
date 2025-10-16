import "./Orders.css";

function OrderCard({
  status = "In Cart",
  image,
  title,
  subtitle,
  price,
  quantity = 1,
  onAdd,
  onDelete,
  onQuantityChange // Nueva prop para cambiar cantidad
}) {
  const total = price * quantity;

  const handleIncrease = () => {
    if (onQuantityChange) {
      onQuantityChange(quantity + 1);
    } else if (onAdd) {
      onAdd();
    }
  };

  const handleDecrease = () => {
    if (onQuantityChange && quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <article>
          <p className="status">{status}</p>
          <a className="order-details">
            <p>ORDER DETAILS</p>
            <span className="material-symbols-outlined">chevron_right</span>
          </a>
        </article>

        <div className="line"></div>

        <div className="product-info">
          <div className="product-group">
            <img src={image} alt={title} onError={(e) => e.target.src = '/images/placeholder-product.jpg'} />
            <div className="Dates">
              <div className="DatesTitles">
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
              </div>

              <div className="prices">
                <h4>${price}</h4>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn" 
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <h5>x{quantity}</h5>
                  <button 
                    className="quantity-btn" 
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="Total">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn-1" onClick={handleIncrease}>
              ADD MORE
            </button>
            <button className="btn-2" onClick={onDelete}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;