import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Leaf,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Utensils,
  X,
} from 'lucide-react'
import './App.css'

type Dish = {
  id: number
  name: string
  description: string
  category: string
  price: number
  rating: number
  time: string
  image: string
  tag?: string
}

const dishes: Dish[] = [
  {
    id: 1,
    name: 'Green goddess bowl',
    description: 'Avocado, quinoa, greens & lemon tahini',
    category: 'Healthy',
    price: 13.5,
    rating: 4.9,
    time: '15–20 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85',
    tag: 'Bestseller',
  },
  {
    id: 2,
    name: 'Sunday roast sandwich',
    description: 'Slow-roasted beef, sharp cheddar, onion jam',
    category: 'Sandwiches',
    price: 14.25,
    rating: 4.8,
    time: '20–25 min',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 3,
    name: 'Spicy miso ramen',
    description: 'Rich miso broth, spring onion & jammy egg',
    category: 'Noodles',
    price: 16.0,
    rating: 4.9,
    time: '20–25 min',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85',
    tag: 'Popular',
  },
  {
    id: 4,
    name: 'Burrata & tomato toast',
    description: 'Whipped burrata, heirloom tomato, basil oil',
    category: 'Vegetarian',
    price: 12.75,
    rating: 4.7,
    time: '10–15 min',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 5,
    name: 'Crispy chicken plate',
    description: 'Herb-crusted chicken, greens & garlic yogurt',
    category: 'Comfort food',
    price: 17.5,
    rating: 4.8,
    time: '20–30 min',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 6,
    name: 'Roasted peach pancakes',
    description: 'Ricotta pancakes, warm peaches, maple butter',
    category: 'Breakfast',
    price: 11.25,
    rating: 4.9,
    time: '15–20 min',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=700&q=85',
    tag: 'New',
  },
]

const categories = ['All', 'Healthy', 'Vegetarian', 'Comfort food', 'Sandwiches', 'Noodles', 'Breakfast']
const money = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount)

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  const visibleDishes = dishes.filter((dish) => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory
    const searchText = `${dish.name} ${dish.description} ${dish.category}`.toLowerCase()
    return matchesCategory && searchText.includes(search.trim().toLowerCase())
  })

  const cartItems = dishes.filter((dish) => cart[dish.id])
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  const subtotal = cartItems.reduce((total, dish) => total + dish.price * cart[dish.id], 0)
  const deliveryFee = subtotal === 0 || subtotal >= 25 ? 0 : 2.5
  const total = subtotal + deliveryFee

  const updateQuantity = (dishId: number, change: number) => {
    setOrderPlaced(false)
    setCart((current) => {
      const quantity = (current[dishId] ?? 0) + change
      if (quantity <= 0) {
        const next = { ...current }
        delete next[dishId]
        return next
      }
      return { ...current, [dishId]: quantity }
    })
  }

  const placeOrder = () => {
    setCart({})
    setOrderPlaced(true)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Forkful home">
          <span className="brand-mark"><Utensils size={19} strokeWidth={2.4} /></span>
          <span>forkful<span className="brand-period">.</span></span>
        </a>
        <div className="delivery-location">
          <MapPin size={16} />
          <span><small>Delivering to</small><strong>Brooklyn, NY</strong></span>
          <ChevronDown size={15} />
        </div>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="nav-active" href="#menu">Discover</a>
          <a href="#menu" onClick={() => setActiveCategory('All')}>Our menu</a>
        </nav>
        <a className="header-cart" href="#cart" aria-label={`View cart, ${itemCount} items`}>
          <ShoppingBag size={19} /><span>My basket</span>
          <span className="cart-count">{itemCount}</span>
        </a>
      </header>

      <main id="top">
        <section className="hero-banner" aria-label="Today's featured offer">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> FRESH FINDS, EVERY DAY</span>
            <h1>A little good<br />goes a <em>long way.</em></h1>
            <p>Thoughtful food from the neighborhood spots you’ll love.</p>
            <a className="hero-link" href="#menu">Find your next favorite <ArrowRight size={17} /></a>
          </div>
          <div className="hero-image" role="img" aria-label="Fresh seasonal salad with greens and vegetables" />
          <div className="hero-stamp"><Leaf size={16} /><span>GOOD FOOD<br />GOOD MOOD</span></div>
        </section>

        <section className="discovery-layout" id="menu">
          <div className="menu-column">
            <div className="section-heading">
              <div>
                <p className="section-kicker">MADE NEAR YOU</p>
                <h2>What sounds good?</h2>
              </div>
              <span className="open-status"><span /> Open now</span>
            </div>

            <div className="search-row">
              <label className="search-box">
                <Search size={19} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search dishes or ingredients"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search dishes or ingredients"
                />
                {search && <button className="clear-search" type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button>}
              </label>
              <button className="filter-button" type="button" onClick={() => setActiveCategory('All')} aria-label="Reset filters">
                <SlidersHorizontal size={18} /><span>Filters</span>
              </button>
            </div>

            <div className="category-list" role="group" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  className={`category-chip${activeCategory === category ? ' selected' : ''}`}
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="results-heading">
              <h3>{activeCategory === 'All' ? 'Today’s favorites' : activeCategory}</h3>
              <span>{visibleDishes.length} dishes</span>
            </div>

            {visibleDishes.length ? (
              <div className="dish-grid">
                {visibleDishes.map((dish) => (
                  <article className="dish-card" key={dish.id}>
                    <div className="dish-photo-wrap">
                      <img className="dish-photo" src={dish.image} alt={dish.name} loading="lazy" />
                      {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                      <span className="photo-rating"><Star size={13} fill="currentColor" /> {dish.rating}</span>
                    </div>
                    <div className="dish-info">
                      <div className="dish-title-row"><h4>{dish.name}</h4><span className="dish-price">{money(dish.price)}</span></div>
                      <p className="dish-description">{dish.description}</p>
                      <div className="dish-footer">
                        <span className="dish-time"><Clock3 size={14} /> {dish.time}</span>
                        {cart[dish.id] ? (
                          <div className="card-quantity" aria-label={`${cart[dish.id]} ${dish.name} in basket`}>
                            <button type="button" onClick={() => updateQuantity(dish.id, -1)} aria-label={`Remove one ${dish.name}`}><Minus size={14} /></button>
                            <span>{cart[dish.id]}</span>
                            <button type="button" onClick={() => updateQuantity(dish.id, 1)} aria-label={`Add one ${dish.name}`}><Plus size={14} /></button>
                          </div>
                        ) : (
                          <button className="add-button" type="button" onClick={() => updateQuantity(dish.id, 1)} aria-label={`Add ${dish.name} to basket`}><Plus size={17} /></button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-results"><Search size={24} /><strong>No dishes found</strong><span>Try another search or category.</span></div>
            )}
          </div>

          <aside className="cart-panel" id="cart" aria-label="Shopping basket">
            <div className="cart-heading">
              <div><p className="section-kicker">YOUR ORDER</p><h2>Your basket <span>({itemCount})</span></h2></div>
              <ShoppingBag size={21} />
            </div>
            {orderPlaced && <div className="order-confirmation" role="status"><Check size={17} /> Order placed! Thanks for choosing local.</div>}
            {cartItems.length ? (
              <div className="cart-items">
                {cartItems.map((dish) => (
                  <div className="cart-item" key={dish.id}>
                    <img src={dish.image} alt="" />
                    <div className="cart-item-copy"><strong>{dish.name}</strong><span>{money(dish.price)}</span>
                      <div className="cart-quantity">
                        <button type="button" onClick={() => updateQuantity(dish.id, -1)} aria-label={`Remove one ${dish.name}`}><Minus size={12} /></button>
                        <span>{cart[dish.id]}</span>
                        <button type="button" onClick={() => updateQuantity(dish.id, 1)} aria-label={`Add one ${dish.name}`}><Plus size={12} /></button>
                      </div>
                    </div>
                    <strong className="cart-line-total">{money(dish.price * cart[dish.id])}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-cart"><span className="empty-bag"><ShoppingBag size={22} /></span><strong>Your basket is waiting</strong><p>Add something delicious to get started.</p></div>
            )}
            <div className="delivery-note"><span className="delivery-note-icon"><Leaf size={15} /></span><span>{subtotal >= 25 ? 'You unlocked free delivery!' : `Add ${money(Math.max(0, 25 - subtotal))} for free delivery`}</span></div>
            <div className="cart-totals">
              <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div><span>Delivery</span><strong>{deliveryFee === 0 ? (subtotal ? 'Free' : '$0.00') : money(deliveryFee)}</strong></div>
              <div className="total-row"><span>Total</span><strong>{money(total)}</strong></div>
            </div>
            <button className="checkout-button" type="button" onClick={placeOrder} disabled={!itemCount}>
              <span>Continue to checkout</span><ArrowRight size={17} />
            </button>
            <p className="secure-note"><Check size={13} /> Secure checkout · No hidden fees</p>
          </aside>
        </section>
      </main>
      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><Utensils size={16} /></span><span>forkful<span className="brand-period">.</span></span></a><span>Good food brings us together.</span><span>Made for your neighborhood.</span></footer>
    </div>
  )
}

export default App
