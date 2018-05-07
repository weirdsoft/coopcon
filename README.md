# coopcon

## Roadmap

### v0.5.0 [ ]
- Identify users of the app (google auth?)
- Add an organization property for the user, save orders referencing the creator's organization
- Only show orders created by the user (that reference it's same organization)

### v0.4.0 [ ]
- Add posibility to delete orders
- Add posibility to edit orders
- Add posibility to edit operations

### v0.3.0 [ ]
- Add a search bar for order filtering
- Separate operations according to their status (receiving orders, shipping and finished)
- Make an operation report summarizing all the orders
- Remove product's quantity (use 1 by default, include details on unit)
- Remove operation's name

### v0.2.0 [x]
- Refine order creation taking into account the products minimal fraction
- Allow marking orders as paid
- Allow order filtering by unpaid
- Allow refreshing the list of operations and orders
- Refine app feedback on some actions (saving an order for example)

### v0.1.0 [x]
- Base implementation of producer, products and operations creation.
- Basic implementation of order creation for an operation
