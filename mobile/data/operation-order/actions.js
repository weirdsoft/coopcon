export const TOGGLE_FILTER_OPERATION_ORDERS_BY_NOT_PAID = 'operation-order/toggle-filter/not-paid'
export const TOGGLE_FILTER_OPERATION_ORDERS_BY_SEARCH = 'operation-ordeer/toggle-filter/search'
export const CHANGE_FILTER_OPERATION_ORDERS_BY_SEARCH = 'operation-ordeer/change-filter/search'

export const toggleFilterOperationOrdersByNotPaid = () => ({
  type: TOGGLE_FILTER_OPERATION_ORDERS_BY_NOT_PAID,
})

export const toggleFilterOperationOrdersBySearch = () => ({
  type: TOGGLE_FILTER_OPERATION_ORDERS_BY_SEARCH,
})

export const changeFilterOperationOrdersBySearch = (searchTerm) => ({
  type: CHANGE_FILTER_OPERATION_ORDERS_BY_SEARCH,
  searchTerm,
})
