import { useState } from 'react'
import './Store.css'

const products = [
  { id: 'P101', name: 'Laptop', category: 'Electronics', price: 60000, stock: 8, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85', tone: 'lilac', tag: 'Bestseller' },
  { id: 'P102', name: 'Headphones', category: 'Electronics', price: 2000, stock: 14, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', tone: 'peach', tag: 'Popular' },
  { id: 'P103', name: 'Everyday Backpack', category: 'Accessories', price: 1500, stock: 11, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', tone: 'mint', tag: '' },
  { id: 'P104', name: 'Analog Watch', category: 'Accessories', price: 4200, stock: 6, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=85', tone: 'blue', tag: 'New arrival' },
  { id: 'P105', name: 'Pour-over Coffee Set', category: 'Home', price: 1800, stock: 9, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', tone: 'yellow', tag: '' },
  { id: 'P106', name: 'Wireless Speaker', category: 'Electronics', price: 3400, stock: 7, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85', tone: 'rose', tag: '' },
]

const formatPrice = (amount) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(amount)

function Header({ itemCount }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top"><span className="brand-mark">c.</span><span>Online Shopping Cart</span></a>
      <nav className="header-links" aria-label="Main navigation"><a className="active-link" href="#shop">Shop</a><a href="#story">Our story</a></nav>
      <a className="header-cart" href="#cart" aria-label={`Shopping bag, ${itemCount} items`}><span>Bag</span><span className="bag-count">{itemCount}</span></a>
    </header>
  )
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className={`product-image ${product.tone}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button className="quick-add" type="button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to bag`}>+</button>
      </div>
      <div className="product-info">
        <div className="product-meta"><span>{product.category}</span><span>{product.id}</span></div>
        <div className="product-name-row"><h3>{product.name}</h3><span className="product-price">{formatPrice(product.price)}</span></div>
        <p className="stock-note">{product.stock} available</p>
      </div>
    </article>
  )
}

function ProductList({ items, onAdd }) {
  if (!items.length) return <p className="no-results">No products match your search. Try another name or category.</p>
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>
}

function CartItem({ product, quantity, onChangeQuantity, onRemove }) {
  return (
    <li className="cart-item">
      <img className="cart-thumb" src={product.image} alt="" />
      <div className="cart-item-details">
        <div className="cart-item-heading"><div><p className="cart-category">{product.category}</p><h3>{product.name}</h3></div>
          <button className="remove-item" type="button" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name}`} title="Remove item">×</button>
        </div>
        <div className="cart-item-bottom">
          <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
            <button type="button" onClick={() => onChangeQuantity(product.id, -1)} aria-label="Decrease quantity">−</button><span>{quantity}</span>
            <button type="button" onClick={() => onChangeQuantity(product.id, 1)} aria-label="Increase quantity" disabled={quantity >= product.stock}>+</button>
          </div>
          <strong>{formatPrice(product.price * quantity)}</strong>
        </div>
      </div>
    </li>
  )
}

function Summary({ itemCount, subtotal, discount, delivery, total }) {
  return (
    <section className="summary" aria-label="Order summary">
      <h3>Order summary</h3>
      <div className="summary-line"><span>Subtotal · {itemCount} items</span><span>{formatPrice(subtotal)}</span></div>
      <div className="summary-line discount-line"><span>Member discount</span><span>{discount ? `−${formatPrice(discount)}` : '—'}</span></div>
      <div className="summary-line"><span>Delivery</span><span>{delivery === 0 ? 'Free' : formatPrice(delivery)}</span></div>
      <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
      <button className="checkout-button" type="button" disabled={!itemCount}>Continue to checkout <span aria-hidden="true">→</span></button>
      <p className="secure-note">Thoughtfully packed. Happily delivered.</p>
    </section>
  )
}

function Cart({ items, itemCount, subtotal, discount, delivery, total, onChangeQuantity, onRemove, onClear }) {
  return (
    <aside className="cart-panel" id="cart">
      <div className="cart-title-row"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({itemCount})</span></h2></div>
        {!!items.length && <button className="clear-button" type="button" onClick={onClear}>Clear all</button>}
      </div>
      {!items.length ? (
        <div className="empty-cart"><div className="empty-bag" aria-hidden="true">∪</div><h3>Your bag is taking a break</h3><p>Add something lovely from the collection.</p><a href="#shop">Explore the shop <span aria-hidden="true">↓</span></a></div>
      ) : (
        <>
          <ul className="cart-items">{items.map(({ product, quantity }) => <CartItem key={product.id} product={product} quantity={quantity} onChangeQuantity={onChangeQuantity} onRemove={onRemove} />)}</ul>
          <div className={`delivery-note ${subtotal > 2000 ? 'delivery-earned' : ''}`}><span className="delivery-symbol">{subtotal > 2000 ? '✓' : '↗'}</span><span>{subtotal > 2000 ? 'Free delivery unlocked' : `Add ${formatPrice(2001 - subtotal)} for free delivery`}</span></div>
          {discount > 0 && <p className="discount-note">Your 10% discount is applied.</p>}
          <Summary itemCount={itemCount} subtotal={subtotal} discount={discount} delivery={delivery} total={total} />
        </>
      )}
    </aside>
  )
}

function App() {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = subtotal > 5000 ? Math.round(subtotal * 0.1) : 0
  const delivery = subtotal > 2000 || subtotal === 0 ? 0 : 99
  const total = subtotal - discount + delivery
  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const matchesSearch = `${product.name} ${product.category} ${product.id}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  function handleAddToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) return current.map((item) => item.product.id === product.id && item.quantity < product.stock ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { product, quantity: 1 }]
    })
  }

  function handleChangeQuantity(productId, amount) {
    setCart((current) => current.map((item) => item.product.id === productId ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  }

  function handleRemove(productId) {
    setCart((current) => current.filter((item) => item.product.id !== productId))
  }

  return (
    <div className="app-shell" id="top">
      <Header itemCount={itemCount} />
      <main>
        <section className="intro" id="shop">
          <div className="intro-copy"><p className="eyebrow"><span className="eyebrow-dot" /> THE EVERYDAY EDIT · 06 THINGS TO LOVE</p>
            <h1>Good things,<br /><span>in good company.</span></h1><p className="intro-description">Useful little luxuries for wherever the day takes you.</p>
          </div>
          <div className="intro-stamp"><span>MADE FOR</span><strong>every<br />day</strong><span>LIVING WELL · EST. 2024</span></div>
        </section>
        <div className="shop-layout">
          <section className="catalog" aria-label="Product collection">
            <div className="catalog-heading"><div><p className="eyebrow">FIND YOUR NEXT FAVOURITE</p><h2>The collection <span>({visibleProducts.length})</span></h2></div>
              <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the shop" aria-label="Search products" />
                {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
              </label>
            </div>
            <div className="category-row" aria-label="Filter by category">{categories.map((item) => <button key={item} type="button" className={category === item ? 'category-chip selected' : 'category-chip'} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div>
            <ProductList items={visibleProducts} onAdd={handleAddToCart} />
          </section>
          <Cart items={cart} itemCount={itemCount} subtotal={subtotal} discount={discount} delivery={delivery} total={total} onChangeQuantity={handleChangeQuantity} onRemove={handleRemove} onClear={() => setCart([])} />
        </div>
      </main>
      <footer id="story"><span>COMMON GOODS</span><span>Less, but lovely. Made for the everyday.</span><span>© 2026</span></footer>
    </div>
  )
}

export default App