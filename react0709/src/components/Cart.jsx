function Cart({ items, onUpdateQuantity, onCheckout, message }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <aside className="cart-panel" id="cart"><div className="cart-heading"><div><p className="eyebrow">Your order</p><h2>Bag <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span></h2></div><span className="bag-icon">▱</span></div>
      {items.length === 0 ? <div className="empty-cart"><div className="empty-cart-icon">○</div><h3>Your bag is waiting</h3><p>Add something delicious and it will show up here.</p></div> : <div className="cart-items">{items.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-details"><strong>{item.name}</strong><span>${(item.price * item.quantity).toFixed(2)}</span><div className="quantity"><button type="button" onClick={() => onUpdateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => onUpdateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>+</button></div></div></div>)}</div>}
      <div className="cart-bottom"><div className="total-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div><button className="checkout-button" disabled={!items.length} type="button" onClick={onCheckout}>Checkout <span>→</span></button>{message && <p className="checkout-message">{message}</p>}</div>
    </aside>
  )
}

export default Cart