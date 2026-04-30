import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BadgePercent,
  Bike,
  ChefHat,
  ChevronRight,
  Clock3,
  ExternalLink,
  Heart,
  Home,
  MapPin,
  Minus,
  Navigation,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Utensils,
  WalletCards,
} from 'lucide-react';
import './styles.css';

const formatMoney = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const restaurants = [
  {
    id: 1,
    name: 'Tandoor Lane',
    cuisine: 'North Indian',
    rating: 4.8,
    time: '24-32 min',
    fee: 39,
    distance: '1.2 mi',
    tag: 'Top rated',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80',
    menu: [
      { id: 'butter-chicken', name: 'Butter Chicken Bowl', price: 289, note: 'Smoky makhani, basmati, pickled onion' },
      { id: 'paneer-roll', name: 'Paneer Kathi Roll', price: 179, note: 'Mint chutney, crisp salad, flaky paratha' },
    ],
  },
  {
    id: 2,
    name: 'Soba Social',
    cuisine: 'Japanese',
    rating: 4.7,
    time: '18-26 min',
    fee: 29,
    distance: '0.8 mi',
    tag: 'Fast',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80',
    menu: [
      { id: 'miso-ramen', name: 'Spicy Miso Ramen', price: 349, note: 'Chashu, egg, corn, chili oil' },
      { id: 'salmon-poke', name: 'Salmon Poke Cup', price: 299, note: 'Avocado, edamame, sesame rice' },
    ],
  },
  {
    id: 3,
    name: 'Verde Kitchen',
    cuisine: 'Healthy',
    rating: 4.6,
    time: '20-30 min',
    fee: 49,
    distance: '2.0 mi',
    tag: 'Fresh',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    menu: [
      { id: 'harvest-salad', name: 'Harvest Grain Salad', price: 249, note: 'Farro, herbs, feta, citrus vinaigrette' },
      { id: 'green-smoothie', name: 'Glow Smoothie', price: 149, note: 'Spinach, mango, ginger, oat milk' },
    ],
  },
  {
    id: 4,
    name: 'Mozza Market',
    cuisine: 'Italian',
    rating: 4.9,
    time: '28-38 min',
    fee: 35,
    distance: '1.7 mi',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=900&q=80',
    menu: [
      { id: 'margherita', name: 'Margherita Pizza', price: 329, note: 'San Marzano, basil, fior di latte' },
      { id: 'pesto-pasta', name: 'Pesto Fusilli', price: 279, note: 'Basil pesto, pine nuts, parmesan' },
    ],
  },
  {
    id: 5,
    name: 'Birria Bros',
    cuisine: 'Mexican',
    rating: 4.8,
    time: '22-34 min',
    fee: 59,
    distance: '2.3 mi',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80',
    menu: [
      { id: 'birria-tacos', name: 'Birria Taco Plate', price: 319, note: 'Consomme, onions, cilantro, lime' },
      { id: 'elote-cup', name: 'Street Corn Cup', price: 129, note: 'Cotija, lime crema, chile dust' },
    ],
  },
  {
    id: 6,
    name: 'Seoul Box',
    cuisine: 'Korean',
    rating: 4.5,
    time: '19-29 min',
    fee: 39,
    distance: '1.5 mi',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=900&q=80',
    menu: [
      { id: 'bibimbap', name: 'Chicken Bibimbap', price: 289, note: 'Gochujang, vegetables, sesame rice' },
      { id: 'kimchi-fries', name: 'Kimchi Fries', price: 179, note: 'Scallions, cheese, spicy mayo' },
    ],
  },
  {
    id: 7,
    name: 'Burger Foundry',
    cuisine: 'American',
    rating: 4.4,
    time: '16-24 min',
    fee: 19,
    distance: '0.6 mi',
    tag: 'Value',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    menu: [
      { id: 'smash-burger', name: 'Double Smash Burger', price: 229, note: 'Cheddar, pickles, house sauce' },
      { id: 'loaded-fries', name: 'Loaded Fries', price: 139, note: 'Crispy fries, aioli, herbs' },
    ],
  },
  {
    id: 8,
    name: 'Sweet Spoon',
    cuisine: 'Dessert',
    rating: 4.9,
    time: '15-22 min',
    fee: 35,
    distance: '0.9 mi',
    tag: 'Late night',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80',
    menu: [
      { id: 'berry-cheesecake', name: 'Berry Cheesecake', price: 169, note: 'Vanilla crumb, berry compote' },
      { id: 'choco-shake', name: 'Chocolate Shake', price: 139, note: 'Malted cocoa, whipped cream' },
    ],
  },
];

const riders = [
  { id: 1, name: 'Aarav Mehta', zone: 'Downtown Loop', status: 'Delivering', rating: 4.9, orders: 128, eta: '7 min', vehicle: 'E-bike' },
  { id: 2, name: 'Maya Singh', zone: 'Market Street', status: 'Available', rating: 4.8, orders: 94, eta: '3 min', vehicle: 'Scooter' },
  { id: 3, name: 'Leo Carter', zone: 'Riverside', status: 'Pickup', rating: 4.7, orders: 156, eta: '11 min', vehicle: 'Motorbike' },
  { id: 4, name: 'Nina Patel', zone: 'Old Town', status: 'Available', rating: 4.9, orders: 203, eta: '5 min', vehicle: 'E-bike' },
  { id: 5, name: 'Sam Wilson', zone: 'Station Road', status: 'Delivering', rating: 4.6, orders: 87, eta: '13 min', vehicle: 'Scooter' },
];

const categories = ['All', 'Indian', 'Japanese', 'Healthy', 'Italian', 'Mexican', 'Korean', 'American', 'Dessert'];
const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'restaurants', label: 'Restaurants', icon: Store },
  { id: 'discounts', label: 'Discounts', icon: BadgePercent },
  { id: 'riders', label: 'Delivery Guys', icon: Bike },
  { id: 'track', label: 'Track Order', icon: Navigation },
];

const discountPrompts = ['Flat 50% Off', '60% Off', 'Combos for 1', 'Buy 1 Get 1', 'Low to High'];
const promoCodes = [
  { app: 'Zomato', code: 'GET150', offer: 'Flat discount on select restaurants', note: 'Check minimum order before checkout' },
  { app: 'Zomato', code: 'HUNGRY50', offer: 'Up to 50% off', note: 'Pair with 4.0+ rated restaurants' },
  { app: 'Swiggy', code: 'WELCOME50', offer: 'New account savings', note: 'Works best when delivery fee is low' },
  { app: 'Swiggy', code: 'SWIGGYIT', offer: 'Up to 50% off', note: 'Look for Swiggy One tags to save delivery fees' },
];
const valueAlternatives = [
  {
    name: 'ONDC',
    channel: 'Magicpin or Pincode',
    saving: 'Often ₹50-₹100 cheaper',
    detail: 'Lower restaurant commissions can mean base-menu pricing on standard meals.',
  },
  {
    name: 'EatSure',
    channel: 'Faasos, Behrouz, Oven Story',
    saving: 'Good for BOGO meals',
    detail: 'Mix brands in one order and watch for no-surge delivery windows.',
  },
  {
    name: 'Magicpin',
    channel: 'Vouchers and Magic Points',
    saving: 'Useful for ₹150 targets',
    detail: 'Stack delivery deals with vouchers to bring a ₹200 meal closer to budget.',
  },
];
const budgetFinds = [
  { id: 'paneer-roll', name: 'Paneer Kathi Roll', source: 'Tandoor Lane', price: 179, dealPrice: 150, tag: '50% deal target' },
  { id: 'green-smoothie', name: 'Glow Smoothie', source: 'Verde Kitchen', price: 149, dealPrice: 149, tag: 'Already under target' },
  { id: 'elote-cup', name: 'Street Corn Cup', source: 'Birria Bros', price: 129, dealPrice: 129, tag: 'Combo add-on' },
  { id: 'loaded-fries', name: 'Loaded Fries', source: 'Burger Foundry', price: 139, dealPrice: 139, tag: 'Low to high' },
  { id: 'choco-shake', name: 'Chocolate Shake', source: 'Sweet Spoon', price: 139, dealPrice: 139, tag: 'Snack hour' },
];

const trackingSteps = [
  { title: 'Order confirmed', time: '7:10 PM', detail: 'Tandoor Lane accepted your order.' },
  { title: 'Food is being prepared', time: '7:18 PM', detail: 'Kitchen is packing your Butter Chicken Bowl.' },
  { title: 'Delivery guy assigned', time: '7:25 PM', detail: 'Aarav Mehta is heading to the restaurant.' },
  { title: 'On the way', time: '7:36 PM', detail: 'Your order is moving toward the drop point.' },
];

const googleMapsUrl =
  'https://www.google.com/maps/search/?api=1&query=MG%20Road%20Bengaluru%20Karnataka%20India';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState({ 'butter-chicken': 1, margherita: 1 });

  const menuItems = restaurants.flatMap((restaurant) =>
    restaurant.menu.map((item) => ({ ...item, restaurant: restaurant.name }))
  );

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const categoryMatch = activeCategory === 'All' || restaurant.cuisine.includes(activeCategory);
      const searchMatch = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const cartItems = menuItems.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] }));
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cartItems.length ? 49 : 0;
  const total = subtotal + delivery;

  const updateCart = (id, change) => {
    setCart((current) => {
      const nextQuantity = Math.max((current[id] || 0) + change, 0);
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  };

  return (
    <main className="app-shell">
      <section className="content">
        <Topbar activePage={activePage} setActivePage={setActivePage} />

        {activePage === 'home' && (
          <HomePage
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            query={query}
            setQuery={setQuery}
            restaurants={filteredRestaurants}
            menuItems={menuItems}
            updateCart={updateCart}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'restaurants' && (
          <RestaurantsPage
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            query={query}
            setQuery={setQuery}
            restaurants={filteredRestaurants}
            updateCart={updateCart}
          />
        )}

        {activePage === 'discounts' && (
          <DiscountsPage
            setActivePage={setActivePage}
            setQuery={setQuery}
            setActiveCategory={setActiveCategory}
            updateCart={updateCart}
          />
        )}

        {activePage === 'riders' && <RidersPage riders={riders} />}

        {activePage === 'track' && <TrackOrderPage />}
      </section>

      <CartPanel cartItems={cartItems} delivery={delivery} subtotal={subtotal} total={total} updateCart={updateCart} />
    </main>
  );
}

function Topbar({ activePage, setActivePage }) {
  return (
    <nav className="topbar" aria-label="Primary navigation">
      <div className="brand">
        <span className="brand-mark">
          <Utensils size={21} />
        </span>
        <span>Crave Courier</span>
      </div>
      <div className="nav-tabs">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={activePage === item.id ? 'active' : ''}
              onClick={() => setActivePage(item.id)}
              type="button"
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </div>
      <button className="location-button" type="button">
        <MapPin size={18} />
        Downtown
        <ChevronRight size={17} />
      </button>
    </nav>
  );
}

function SearchAndFilters({ activeCategory, setActiveCategory, query, setQuery }) {
  return (
    <>
      <div className="search-row">
        <label className="search-box">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search restaurant or cuisine"
          />
        </label>
        <button className="filter-button" type="button" aria-label="Open filters">
          <SlidersHorizontal size={20} />
        </button>
      </div>
      <section className="category-row" aria-label="Cuisine filters">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </section>
    </>
  );
}

function HomePage(props) {
  const { restaurants: visibleRestaurants, menuItems, updateCart, setActivePage } = props;

  return (
    <>
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={16} />
            Dinner in motion
          </span>
          <h1>Order food from your favorite kitchens in minutes.</h1>
          <p>Browse more restaurants, track nearby delivery partners, and build a cart without losing your place.</p>
          <button className="hero-track-button" type="button" onClick={() => setActivePage('track')}>
            <Navigation size={18} />
            Track delivery
          </button>
          <SearchAndFilters {...props} />
        </div>
        <div className="hero-image" aria-label="Fresh meal tray">
          <img
            src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1100&q=80"
            alt=""
          />
          <div className="delivery-pill">
            <Bike size={18} />
            14 active couriers nearby
          </div>
        </div>
      </header>

      <StatsBand />

      <section className="savings-strip">
        <div>
          <strong>Find ₹150 meals faster</strong>
          <span>Use discount-first searches, combos, and low-fee windows.</span>
        </div>
        <button type="button" onClick={() => setActivePage('discounts')}>
          <BadgePercent size={18} />
          Open discounts
        </button>
      </section>

      <SectionHeading title="Nearby restaurants" subtitle={`${visibleRestaurants.length} kitchens delivering now`}>
        <button type="button" onClick={() => setActivePage('restaurants')}>See all</button>
      </SectionHeading>
      <RestaurantGrid restaurants={visibleRestaurants.slice(0, 4)} />

      <SectionHeading title="Popular dishes" subtitle="Quick add favorites from every menu" className="popular-heading" />
      <DishList items={menuItems.slice(0, 8)} updateCart={updateCart} />
    </>
  );
}

function DiscountsPage({ setActivePage, setQuery, setActiveCategory, updateCart }) {
  const applyPrompt = (prompt) => {
    setQuery(prompt);
    setActiveCategory('All');
    setActivePage('restaurants');
  };

  return (
    <>
      <PageHeader
        icon={BadgePercent}
        title="Discount Finder"
        description="Search by offer first, sort for low prices, and spot meals that can land near ₹150."
      />

      <section className="discount-hero">
        <div>
          <span className="tag">Smart prompting</span>
          <h2>Start with the discount, then choose the dish.</h2>
          <p>Try high-value keywords, keep ratings above 4.0, and check low-to-high prices before opening a menu.</p>
        </div>
        <div className="prompt-grid">
          {discountPrompts.map((prompt) => (
            <button type="button" key={prompt} onClick={() => applyPrompt(prompt)}>
              <Search size={17} />
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="discount-grid">
        <article className="discount-panel">
          <div className="panel-title">
            <BadgePercent size={21} />
            <div>
              <h2>Promo watchlist</h2>
              <p>Check availability and minimum order in the delivery app.</p>
            </div>
          </div>
          <div className="promo-list">
            {promoCodes.map((promo) => (
              <div className="promo-code-card" key={`${promo.app}-${promo.code}`}>
                <span>{promo.app}</span>
                <strong>{promo.code}</strong>
                <p>{promo.offer}</p>
                <small>{promo.note}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="discount-panel">
          <div className="panel-title">
            <WalletCards size={21} />
            <div>
              <h2>₹150 gems</h2>
              <p>Quick picks and combo-friendly items.</p>
            </div>
          </div>
          <div className="budget-list">
            {budgetFinds.map((item) => (
              <div className="budget-row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.source} · {item.tag}</span>
                </div>
                <div className="budget-price">
                  <small>{formatMoney(item.price)}</small>
                  <b>{formatMoney(item.dealPrice)}</b>
                </div>
                <button type="button" onClick={() => updateCart(item.id, 1)} aria-label={`Add ${item.name}`}>
                  <Plus size={16} />
                </button>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="alternatives-panel">
        <div className="panel-title">
          <Store size={21} />
          <div>
            <h2>Better value alternatives</h2>
            <p>Compare direct-to-consumer and open-network options before ordering.</p>
          </div>
        </div>
        <div className="alternative-list">
          {valueAlternatives.map((option) => (
            <article className="alternative-card" key={option.name}>
              <span>{option.channel}</span>
              <h3>{option.name}</h3>
              <strong>{option.saving}</strong>
              <p>{option.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tips-grid">
        <article>
          <Clock3 size={22} />
          <h3>Time it right</h3>
          <p>Happy-hour windows around 2 PM to 5 PM often make snack orders cheaper with lower delivery fees.</p>
        </article>
        <article>
          <Store size={22} />
          <h3>Check combos</h3>
          <p>Open “Combos for 1” and lunch-box sections for wraps, thalis, and mini meals around ₹129 to ₹149.</p>
        </article>
        <article>
          <MapPin size={22} />
          <h3>Local tiffins</h3>
          <p>For Noida Sector 130, add tiffin services to your shortlist when you want healthier meals near ₹100 to ₹130.</p>
        </article>
      </section>
    </>
  );
}

function RestaurantsPage({ activeCategory, setActiveCategory, query, setQuery, restaurants: visibleRestaurants, updateCart }) {
  return (
    <>
      <PageHeader
        icon={Store}
        title="Restaurants"
        description="Explore more kitchens, compare ratings, and add signature dishes from every restaurant."
      />
      <SearchAndFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        query={query}
        setQuery={setQuery}
      />
      <RestaurantGrid restaurants={visibleRestaurants} />
      <SectionHeading title="Restaurant menus" subtitle="Top dishes grouped by kitchen" className="popular-heading" />
      <section className="menu-board">
        {visibleRestaurants.map((restaurant) => (
          <article className="menu-card" key={restaurant.id}>
            <div className="menu-title">
              <ChefHat size={20} />
              <div>
                <h3>{restaurant.name}</h3>
                <span>{restaurant.cuisine}</span>
              </div>
            </div>
            {restaurant.menu.map((item) => (
              <div className="menu-line" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.note}</span>
                </div>
                <button type="button" onClick={() => updateCart(item.id, 1)}>
                  {formatMoney(item.price)}
                </button>
              </div>
            ))}
          </article>
        ))}
      </section>
    </>
  );
}

function RidersPage({ riders }) {
  return (
    <>
      <PageHeader
        icon={Bike}
        title="Delivery Guys"
        description="Track active delivery partners, coverage zones, vehicle type, and estimated pickup times."
      />
      <section className="rider-dashboard">
        <div className="map-panel">
          <div className="map-grid">
            {riders.map((rider, index) => (
              <span className={`rider-pin pin-${index + 1}`} key={rider.id}>
                <Navigation size={15} />
              </span>
            ))}
          </div>
          <div className="map-caption">
            <strong>Live delivery coverage</strong>
            <span>5 partners active across downtown zones</span>
            <a href={googleMapsUrl} target="_blank" rel="noreferrer">
              Open Google Maps
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        <div className="rider-list">
          {riders.map((rider) => (
            <article className="rider-card" key={rider.id}>
              <div className="rider-avatar">{rider.name.split(' ').map((part) => part[0]).join('')}</div>
              <div className="rider-info">
                <div>
                  <h3>{rider.name}</h3>
                  <span>{rider.zone}</span>
                </div>
                <div className="rider-meta">
                  <span>
                    <ShieldCheck size={15} />
                    {rider.status}
                  </span>
                  <span>
                    <Star size={15} />
                    {rider.rating}
                  </span>
                  <span>
                    <Clock3 size={15} />
                    {rider.eta}
                  </span>
                </div>
              </div>
              <div className="rider-stat">
                <strong>{rider.orders}</strong>
                <span>{rider.vehicle}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function TrackOrderPage() {
  return (
    <>
      <PageHeader
        icon={Navigation}
        title="Track Order"
        description="Follow the delivery guy, see live order progress, and open the drop zone in Google Maps."
      />
      <section className="tracking-layout">
        <div className="tracking-map">
          <div className="route-line" />
          <span className="route-point restaurant-point">
            <Store size={17} />
          </span>
          <span className="route-point courier-point">
            <Bike size={18} />
          </span>
          <span className="route-point customer-point">
            <MapPin size={18} />
          </span>
          <div className="tracking-card live-card">
            <strong>Aarav Mehta</strong>
            <span>Arriving in 7 min by E-bike</span>
          </div>
          <div className="tracking-card drop-card">
            <strong>Drop location</strong>
            <span>MG Road, Bengaluru</span>
          </div>
        </div>

        <div className="tracking-details">
          <article className="status-panel">
            <span className="tag">Live tracking</span>
            <h2>Your food is on the way</h2>
            <p>Courier has picked up the order and is following the fastest route to your location.</p>
            <div className="tracking-actions">
              <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                <MapPin size={18} />
                Open Google Maps
                <ExternalLink size={15} />
              </a>
              <button type="button">
                <Clock3 size={18} />
                ETA 7 min
              </button>
            </div>
          </article>

          <article className="timeline-panel">
            <h2>Delivery progress</h2>
            <div className="timeline-list">
              {trackingSteps.map((step, index) => (
                <div className={index === trackingSteps.length - 1 ? 'timeline-step active' : 'timeline-step'} key={step.title}>
                  <span className="timeline-dot" />
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                  <time>{step.time}</time>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function PageHeader({ icon: Icon, title, description }) {
  return (
    <header className="page-header">
      <span>
        <Icon size={21} />
      </span>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}

function StatsBand() {
  return (
    <section className="stats-band">
      <div>
        <strong>8</strong>
        <span>restaurant partners</span>
      </div>
      <div>
        <strong>16</strong>
        <span>featured dishes</span>
      </div>
      <div>
        <strong>5</strong>
        <span>delivery partners</span>
      </div>
    </section>
  );
}

function SectionHeading({ title, subtitle, children, className = '' }) {
  return (
    <section className={`section-heading ${className}`}>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function RestaurantGrid({ restaurants: visibleRestaurants }) {
  return (
    <section className="restaurant-grid">
      {visibleRestaurants.map((restaurant) => (
        <article className="restaurant-card" key={restaurant.id}>
          <div className="card-image">
            <img src={restaurant.image} alt={`${restaurant.name} food`} />
            <button type="button" aria-label={`Save ${restaurant.name}`}>
              <Heart size={18} />
            </button>
          </div>
          <div className="card-body">
            <div>
              <span className="tag">{restaurant.tag}</span>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.cuisine}</p>
            </div>
            <div className="meta-row">
              <span>
                <Star size={15} />
                {restaurant.rating}
              </span>
              <span>
                <Clock3 size={15} />
                {restaurant.time}
              </span>
              <span>{restaurant.distance}</span>
              <span>{formatMoney(restaurant.fee)}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function DishList({ items, updateCart }) {
  return (
    <section className="dish-list">
      {items.map((item) => (
        <article className="dish-row" key={item.id}>
          <div>
            <h3>{item.name}</h3>
            <p>{item.note}</p>
            <span>{item.restaurant}</span>
          </div>
          <div className="dish-action">
            <strong>{formatMoney(item.price)}</strong>
            <button type="button" onClick={() => updateCart(item.id, 1)} aria-label={`Add ${item.name}`}>
              <Plus size={18} />
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

function CartPanel({ cartItems, delivery, subtotal, total, updateCart }) {
  return (
    <aside className="cart-panel" aria-label="Order summary">
      <div className="cart-header">
        <div>
          <span>Your order</span>
          <h2>Evening delivery</h2>
        </div>
        <ShoppingBag size={24} />
      </div>

      <div className="address-card">
        <MapPin size={18} />
        <div>
          <strong>Deliver to</strong>
          <span>221 Market Street, Apt 8B</span>
        </div>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Add a dish to start your order.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>{formatMoney(item.price)}</span>
              </div>
              <div className="quantity-stepper">
                <button type="button" onClick={() => updateCart(item.id, -1)} aria-label={`Remove ${item.name}`}>
                  <Minus size={15} />
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateCart(item.id, 1)} aria-label={`Add ${item.name}`}>
                  <Plus size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="promo-card">
        <WalletCards size={20} />
        <div>
          <strong>20% off unlocked</strong>
          <span>Applied automatically at checkout</span>
        </div>
      </div>

      <div className="totals">
        <div>
          <span>Subtotal</span>
          <strong>{formatMoney(subtotal)}</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>{formatMoney(delivery)}</strong>
        </div>
        <div className="total-line">
          <span>Total</span>
          <strong>{formatMoney(total)}</strong>
        </div>
      </div>

      <button className="checkout-button" type="button">
        Checkout
        <ChevronRight size={19} />
      </button>
    </aside>
  );
}

createRoot(document.getElementById('root')).render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}
