import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const databaseName = process.env.MONGODB_DB || 'crave_courier';

const restaurants = [
  {
    slug: 'tandoor-lane',
    name: 'Tandoor Lane',
    cuisine: 'North Indian',
    rating: 4.8,
    deliveryTime: '24-32 min',
    deliveryFee: 39,
    distance: '1.2 mi',
    tag: 'Top rated',
    menu: [
      { sku: 'butter-chicken', name: 'Butter Chicken Bowl', price: 289 },
      { sku: 'paneer-roll', name: 'Paneer Kathi Roll', price: 179 },
    ],
  },
  {
    slug: 'soba-social',
    name: 'Soba Social',
    cuisine: 'Japanese',
    rating: 4.7,
    deliveryTime: '18-26 min',
    deliveryFee: 29,
    distance: '0.8 mi',
    tag: 'Fast',
    menu: [
      { sku: 'miso-ramen', name: 'Spicy Miso Ramen', price: 349 },
      { sku: 'salmon-poke', name: 'Salmon Poke Cup', price: 299 },
    ],
  },
  {
    slug: 'mozza-market',
    name: 'Mozza Market',
    cuisine: 'Italian',
    rating: 4.9,
    deliveryTime: '28-38 min',
    deliveryFee: 35,
    distance: '1.7 mi',
    tag: 'Popular',
    menu: [
      { sku: 'margherita', name: 'Margherita Pizza', price: 329 },
      { sku: 'pesto-pasta', name: 'Pesto Fusilli', price: 279 },
    ],
  },
];

const riders = [
  {
    employeeId: 'RDR-1001',
    name: 'Aarav Mehta',
    zone: 'Downtown Loop',
    status: 'Delivering',
    rating: 4.9,
    completedOrders: 128,
    eta: '7 min',
    vehicle: 'E-bike',
  },
  {
    employeeId: 'RDR-1002',
    name: 'Maya Singh',
    zone: 'Market Street',
    status: 'Available',
    rating: 4.8,
    completedOrders: 94,
    eta: '3 min',
    vehicle: 'Scooter',
  },
];

const orders = [
  {
    orderNumber: 'CC-2401',
    customerName: 'Demo Customer',
    restaurantSlug: 'tandoor-lane',
    riderEmployeeId: 'RDR-1001',
    status: 'On the way',
    deliveryAddress: 'MG Road, Bengaluru, Karnataka, India',
    subtotal: 618,
    deliveryFee: 49,
    total: 667,
    items: [
      { sku: 'butter-chicken', name: 'Butter Chicken Bowl', price: 289, quantity: 1 },
      { sku: 'margherita', name: 'Margherita Pizza', price: 329, quantity: 1 },
    ],
    trackingSteps: [
      { title: 'Order confirmed', time: '7:10 PM', completed: true },
      { title: 'Food is being prepared', time: '7:18 PM', completed: true },
      { title: 'Delivery guy assigned', time: '7:25 PM', completed: true },
      { title: 'On the way', time: '7:36 PM', completed: true },
    ],
  },
];

async function seed() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db(databaseName);

    await Promise.all([
      db.collection('restaurants').deleteMany({}),
      db.collection('riders').deleteMany({}),
      db.collection('orders').deleteMany({}),
    ]);

    await Promise.all([
      db.collection('restaurants').insertMany(restaurants),
      db.collection('riders').insertMany(riders),
      db.collection('orders').insertMany(orders),
    ]);

    await Promise.all([
      db.collection('restaurants').createIndex({ slug: 1 }, { unique: true }),
      db.collection('restaurants').createIndex({ cuisine: 1 }),
      db.collection('riders').createIndex({ employeeId: 1 }, { unique: true }),
      db.collection('riders').createIndex({ status: 1 }),
      db.collection('orders').createIndex({ orderNumber: 1 }, { unique: true }),
      db.collection('orders').createIndex({ status: 1 }),
    ]);

    console.log(`MongoDB database created: ${databaseName}`);
    console.log('Collections seeded: restaurants, riders, orders');
  } finally {
    await client.close();
  }
}

seed().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
