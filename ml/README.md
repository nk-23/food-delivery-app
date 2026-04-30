# Customer Behavior ML Model

This project includes a lightweight customer behavior model for the food delivery app.

Goal: predict whether a customer is likely to respond to a discount offer.

Input features:
- `avg_order_value`
- `orders_30d`
- `discount_orders_30d`
- `days_since_last_order`
- `cancelled_orders_30d`
- `late_deliveries_30d`
- `support_tickets_30d`
- `app_opens_7d`

Target:
- `discount_responder`: `1` means likely to respond to a discount, `0` means unlikely.

Train the model:

```bash
npm run ml:train
```

The trained model is saved to:

```text
models/customer-behavior-model.json
```

How the app can use it:
- Show `GET150` or combo offers to customers with high predicted discount response.
- Show premium restaurant recommendations to low discount-response customers.
- Identify customers at risk of inactivity using high `days_since_last_order`.
- Improve discount spending by targeting customers who actually react to offers.
