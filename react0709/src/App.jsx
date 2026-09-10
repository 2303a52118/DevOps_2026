import { useMemo, useState } from 'react'
import Header from './components/Header'
import RestaurantList from './components/RestaurantList'
import FoodItem from './components/FoodItem'
import Cart from './components/Cart'
import Footer from './components/Footer'
import './App.css'

const restaurants = [
  {
    id: 1,
    name: 'Miso House',
    cuisine: 'Japanese comfort food',
    rating: '4.9',
    delivery: '20-30 min',
    color: 'coral',
    menu: [
      { id: 101, name: 'Miso Butter Ramen', description: 'Silky broth, roasted corn, spring onion, and a jammy egg.', price: 14.5, category: 'Noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85' },
      { id: 102, name: 'Crispy Gyoza', description: 'Six golden dumplings with ginger ponzu and chili oil.', price: 9.25, category: 'Small plates', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=700&q=85' },
      { id: 103, name: 'Salmon Donburi', description: 'Sushi rice, sesame salmon, cucumber, and wasabi mayo.', price: 16.75, category: 'Rice bowls', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85' },
      { id: 104, name: 'Yuzu Chicken Katsu', description: 'Panko-crusted chicken, cabbage slaw, and bright yuzu sauce.', price: 15.25, category: 'Rice bowls', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85' },
      { id: 105, name: 'Matcha Mochi', description: 'Soft rice cakes filled with matcha cream and red bean.', price: 6.75, category: 'Sweets', image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=700&q=85' },
    ],
  },
  {
    id: 2,
    name: 'Green & Grain',
    cuisine: 'Fresh bowls and salads',
    rating: '4.8',
    delivery: '15-25 min',
    color: 'sage',
    menu: [
      { id: 201, name: 'Harvest Grain Bowl', description: 'Roasted squash, feta, herbs, farro, and tahini dressing.', price: 13.95, category: 'Bowls', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85' },
      { id: 202, name: 'Citrus Chicken Salad', description: 'Charred chicken, avocado, greens, and bright citrus vinaigrette.', price: 15.5, category: 'Salads', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85' },
      { id: 203, name: 'Mango Chia Pudding', description: 'Creamy coconut chia, ripe mango, and toasted coconut.', price: 7.5, category: 'Sweets', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=85' },
      { id: 204, name: 'Herby Falafel Pita', description: 'Crisp falafel, pickled onion, cucumber, and green tahini.', price: 12.75, category: 'Handhelds', image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb5?auto=format&fit=crop&w=700&q=85' },
      { id: 205, name: 'Berry Granola Cup', description: 'Greek yogurt, seasonal berries, honey, and toasted oats.', price: 7.25, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=85' },
    ],
  },
  {
    id: 3,
    name: 'Ember & Crust',
    cuisine: 'Wood-fired pizza',
    rating: '4.7',
    delivery: '25-35 min',
    color: 'gold',
    menu: [
      { id: 301, name: 'Hot Honey Pepperoni', description: 'San Marzano tomato, mozzarella, pepperoni, and hot honey.', price: 17, category: 'Pizza', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85' },
      { id: 302, name: 'Wild Mushroom', description: 'Roasted mushrooms, fontina, thyme, and garlic cream.', price: 16.5, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85' },
      { id: 303, name: 'Tiramisu Cup', description: 'Espresso-soaked mascarpone, cocoa, and dark chocolate.', price: 8.25, category: 'Sweets', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=85' },
      { id: 304, name: 'Charred Corn Focaccia', description: 'Whipped ricotta, sweet corn, basil, and chili crunch.', price: 11.5, category: 'Small plates', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85' },
      { id: 305, name: 'Roasted Garlic Knots', description: 'Six blistered knots with parmesan and parsley butter.', price: 7.95, category: 'Small plates', image: 'https://images.unsplash.com/photo-1619535860434-cf9b902a6c2a?auto=format&fit=crop&w=700&q=85' },
    ],
  },
  {
    id: 4,
    name: 'Saffron Table',
    cuisine: 'Persian and Mediterranean',
    rating: '4.9',
    delivery: '25-35 min',
    color: 'gold',
    menu: [
      { id: 401, name: 'Chicken Saffron Bowl', description: 'Tender saffron chicken, jeweled rice, herbs, and sumac yogurt.', price: 16.25, category: 'Rice bowls', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=85' },
      { id: 402, name: 'Whipped Feta Dip', description: 'Creamy feta, olive oil, herbs, and warm flatbread for dipping.', price: 10.5, category: 'Small plates', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=700&q=85' },
      { id: 403, name: 'Pistachio Baklava', description: 'Flaky pastry, roasted pistachio, and orange blossom syrup.', price: 7.75, category: 'Sweets', image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=700&q=85' },
    ],
  },
  {
    id: 5,
    name: 'Bangkok Bicycle',
    cuisine: 'Thai street food',
    rating: '4.8',
    delivery: '20-30 min',
    color: 'sage',
    menu: [
      { id: 501, name: 'Pad Thai Noodles', description: 'Rice noodles, wok egg, bean sprouts, peanuts, and lime.', price: 14.25, category: 'Noodles', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=700&q=85' },
      { id: 502, name: 'Green Curry', description: 'Coconut curry, seasonal vegetables, basil, and jasmine rice.', price: 15.75, category: 'Rice bowls', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=700&q=85' },
      { id: 503, name: 'Mango Sticky Rice', description: 'Sweet coconut rice, ripe mango, and toasted mung beans.', price: 8.5, category: 'Sweets', image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=700&q=85' },
    ],
  },
]

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0])
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const categories = ['All', ...new Set(selectedRestaurant.menu.map((item) => item.category))]
  const visibleItems = useMemo(() => selectedRestaurant.menu.filter((item) => {
    const matchesSearch = `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (category === 'All' || item.category === category)
  }), [category, search, selectedRestaurant])

  const addToCart = (item) => {
    setCheckoutMessage('')
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id)
      if (existing) return current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
      return [...current, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id, change) => setCart((current) => current.flatMap((item) => {
    if (item.id !== id) return [item]
    const quantity = item.quantity + change
    return quantity > 0 ? [{ ...item, quantity }] : []
  }))

  const handleRestaurantChange = (restaurant) => {
    setSelectedRestaurant(restaurant)
    setSearch('')
    setCategory('All')
  }

  const handleCheckout = () => setCheckoutMessage('Order received. We are getting your kitchen started.')

  return (
    <div className="app-shell">
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Dinner, sorted</p>
            <h1>Good food,<br /><em>wherever you are.</em></h1>
            <p className="hero-description">Local favorites, thoughtfully packed and brought to your door while they are still worth talking about.</p>
            <label className="hero-search"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="What are you craving?" aria-label="Search for food" /><a href="#menu" aria-label="View search results">→</a></label>
            <a className="hero-link" href="#menu">Browse today's menu <span>↓</span></a>
          </div>
          <div className="hero-art" aria-label="A beautifully plated meal" role="img">
            <div className="hero-stamp">Fresh<br />tonight</div>
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85" alt="Colorful plates of food on a table" />
          </div>
        </section>

        <section className="order-layout" id="menu">
          <div className="menu-column">
            <RestaurantList restaurants={restaurants} selectedId={selectedRestaurant.id} onSelect={handleRestaurantChange} />
            <div className="menu-heading">
              <div>
                <p className="eyebrow">{selectedRestaurant.cuisine}</p>
                <h2>{selectedRestaurant.name}</h2>
              </div>
              <div className="menu-meta"><span>★ {selectedRestaurant.rating}</span><span>{selectedRestaurant.delivery}</span></div>
            </div>
            <div className="filters">
              <label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the menu" aria-label="Search the menu" /></label>
              <div className="category-list">{categories.map((item) => <button className={category === item ? 'category active' : 'category'} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
            </div>
            <div className="food-grid">{visibleItems.map((item) => <FoodItem item={item} key={item.id} onAdd={addToCart} />)}</div>
            {visibleItems.length === 0 && <p className="empty-results">No dishes match that search yet.</p>}
          </div>
          <Cart items={cart} onUpdateQuantity={updateQuantity} onCheckout={handleCheckout} message={checkoutMessage} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
