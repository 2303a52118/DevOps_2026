function FoodItem({ item, onAdd }) {
  return (
    <article className="food-card">
      <img src={item.image} alt={item.name} />
      <div className="food-card-body"><div className="food-card-top"><span className="food-category">{item.category}</span><span className="food-price">${item.price.toFixed(2)}</span></div><h3>{item.name}</h3><p>{item.description}</p><button className="add-button" type="button" onClick={() => onAdd(item)}><span>+</span> Add to bag</button></div>
    </article>
  )
}

export default FoodItem