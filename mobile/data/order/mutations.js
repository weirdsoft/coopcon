import gql from 'graphql-tag'

export const createOrderMutation = gql`
  mutation createOrder($order: OrderInput!) {
    order: createOrder(order: $order) {
      _id
      user
      creationDate
      operation {
        _id
      }
    }
  }
`

export const addOrderProductMutation = gql`
  mutation addOrderProduct($id: ID!, $orderProduct: OrderProductInput!) {
    orderProduct: addOrderProduct(id: $id, orderProduct: $orderProduct) {
      quantity
      product {
        _id
      }
    }
  }
`

export const toggleOrderPaidMutation = gql`
  mutation toggleOrderPaid($id: ID!) {
    order: toggleOrderPaid(id: $id) {
      _id
      paid
    }
  }
`
