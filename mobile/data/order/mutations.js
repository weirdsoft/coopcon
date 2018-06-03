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

export const removeOrderProductMutation = gql`
  mutation removeOrderProduct($id: ID!, $orderProduct: OrderProductInput!) {
    orderProduct: removeOrderProduct(id: $id, orderProduct: $orderProduct) {
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

export const deleteOrderMutation = gql`
  mutation deleteOrder($id: ID!) {
    order: deleteOrder(id: $id) {
      _id
      operation {
        _id
      }
    }
  }
`
