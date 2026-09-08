function RestaurantList({ restaurants, selectedId, onSelect }) {
  return (
    <div className="restaurant-strip" aria-label="Choose a restaurant">
      <div className="section-label"><span className="label-line" /> <span>Choose a kitchen</span></div>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => <button type="button" className={`restaurant-chip ${restaurant.color} ${selectedId === restaurant.id ? 'selected' : ''}`} key={restaurant.id} onClick={() => onSelect(restaurant)}><span className="restaurant-dot">{restaurant.name.charAt(0)}</span><span><strong>{restaurant.name}</strong><small>{restaurant.cuisine}</small></span><span className="arrow">→</span></button>)}
      </div>
    </div>
  )
}

export default RestaurantList