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

Advanced outputs:
- `discountResponseProbability`: probability that each customer responds to a discount.
- `churnRisk`: estimated risk from recency, low app engagement, cancellations, late deliveries, and support tickets.
- `estimatedMonthlyValue`: simple customer value estimate from order value and monthly order count.
- `segment`: business segment such as `Deal loyalist`, `Premium regular`, `At-risk customer`, or `High-intent browser`.
- `campaign`: recommended next-best action, offer type, message, and channel.
- `segmentSummary`: customer counts by segment.
- `featureImportance`: model weights sorted by strongest influence.

How the app can use it:
- Show `GET150` or combo offers to customers with high predicted discount response.
- Show premium restaurant recommendations to low discount-response customers.
- Identify customers at risk of inactivity using high `days_since_last_order`.
- Improve discount spending by targeting customers who actually react to offers.

Advanced campaign ideas:
- Use `Deal loyalist` customers for ₹150 meal bundles, BOGO offers, and ONDC/Magicpin value prompts.
- Use `Premium regular` customers for high-rated restaurants, loyalty points, and faster delivery slots instead of deep coupons.
- Use `At-risk customer` customers for win-back coupons and apology credits after late deliveries.
- Use `High-intent browser` customers for cart nudges, delivery-fee waivers, and limited-time lunch offers.
