function Header({ cartCount }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Table for one home"><span className="brand-mark">T</span><span>table for one</span></a>
      <nav aria-label="Main navigation"><a href="#menu">Menu</a><a href="#about">About us</a><a href="#contact">Contact</a></nav>
      <a className="cart-link" href="#cart">Your bag <span>{cartCount}</span></a>
    </header>
  )
}

export default Header