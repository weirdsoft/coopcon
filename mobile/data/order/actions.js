export const TOGGLE_ORDER = 'order/toggle'
export const SHOW_ADD_ORDER_PRODUCT_DIALOG = 'order/product/add-dialog/show'
export const HIDE_ADD_ORDER_PRODUCT_DIALOG = 'order/product/add-dialog/hide'
export const ADD_PRODUCT_TO_ORDER = 'order/product/add'

export const toggleOrder = (id) => ({
  type: TOGGLE_ORDER,
  id,
})

export const showAddOrderProductDialog = () => ({
  type: SHOW_ADD_ORDER_PRODUCT_DIALOG,
})

export const hideAddOrderProductDialog = () => ({
  type: HIDE_ADD_ORDER_PRODUCT_DIALOG,
})

export const addProductToOrder = (id) => ({
  type: ADD_PRODUCT_TO_ORDER,
  id,
})
