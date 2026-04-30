# Crave Courier MongoDB

Database name: `crave_courier`

Collections:
- `restaurants`: restaurant profiles, cuisine, delivery fee, distance, and menu items.
- `riders`: delivery partner profiles, zone, status, rating, ETA, and vehicle.
- `orders`: customer order summary, delivery address, assigned rider, status, and tracking steps.

Seed the database:

```bash
npm run db:seed
```

Use `.env` for your MongoDB connection:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=crave_courier
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.
