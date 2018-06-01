export const TOGGLE_ORDER = 'order/toggle'
export const SHOW_ADD_ORDER_PRODUCT_DIALOG = 'order/product/add-dialog/show'
export const HIDE_ADD_ORDER_PRODUCT_DIALOG = 'order/product/add-dialog/hide'
export const ADD_PRODUCT_TO_ORDER = 'order/product/add'
export const REMOVE_PRODUCT_FROM_ORDER = 'order/product/remove'
export const ADD_TO_PRODUCT_QUANTITY = 'order/product/add-quantity'
export const SUBTRACT_TO_PRODUCT_QUANTITY = 'order/product/subtract-quantity'
export const SHOW_SAVE_ORDER_DIALOG = 'order/save-dialog/show'
export const HIDE_SAVE_ORDER_DIALOG = 'order/save-dialog/hide'
export const CHANGE_ORDER_USER = 'order/user/change'
export const SAVE_NEW_ORDER_REQUEST = 'order/save-new/request'
export const SAVE_NEW_ORDER_SUCCESS = 'order/save-new/success'
export const SAVE_NEW_ORDER_FAILURE = 'order/save-new/failure'
export const SAVE_ORDER_REQUEST = 'order/save/request'
export const SAVE_ORDER_SUCCESS = 'order/save/success'
export const SAVE_ORDER_FAILURE = 'order/save/failure'
export const TOGGLE_PAID_ORDER_REQUEST = 'order/toggle-paid/request'
export const TOGGLE_PAID_ORDER_SUCCESS = 'order/toggle-paid/success'
export const TOGGLE_PAID_ORDER_FAILURE = 'order/toggle-paid/failure'
export const DELETE_ORDER_REQUEST = 'order/delete/request'
export const DELETE_ORDER_SUCCESS = 'order/delete/success'
export const DELETE_ORDER_FAILURE = 'order/delete/failure'

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

export const addProductToOrder = (id, quantity) => ({
  type: ADD_PRODUCT_TO_ORDER,
  id,
  quantity,
})

export const removeProductFromOrder = (id) => ({
  type: REMOVE_PRODUCT_FROM_ORDER,
  id,
})

export const addToProductQuantity = (id) => ({
  type: ADD_TO_PRODUCT_QUANTITY,
  id,
})

export const subtractToProductQuantity = (id) => ({
  type: SUBTRACT_TO_PRODUCT_QUANTITY,
  id,
})

export const showSaveOrderDialog = () => ({
  type: SHOW_SAVE_ORDER_DIALOG,
})

export const hideSaveOrderDialog = () => ({
  type: HIDE_SAVE_ORDER_DIALOG,
})

export const changeOrderUser = (user) => ({
  type: CHANGE_ORDER_USER,
  user,
})

export const saveNewOrder = () => ({
  type: SAVE_NEW_ORDER_REQUEST,
})

export const receiveNewOrder = (order) => ({
  type: SAVE_NEW_ORDER_SUCCESS,
  order,
})

export const failReceiveNewOrder = (reason) => ({
  type: SAVE_NEW_ORDER_FAILURE,
  reason,
})

export const saveOrder = () => ({
  type: SAVE_ORDER_REQUEST,
})

export const receiveOrder = (order) => ({
  type: SAVE_ORDER_SUCCESS,
  order,
})

export const failReceiveOrder = (reason) => ({
  type: SAVE_ORDER_FAILURE,
  reason,
})

export const togglePaidOrder = () => ({
  type: TOGGLE_PAID_ORDER_REQUEST,
})

export const receiveTogglePaidOrder = (order) => ({
  type: TOGGLE_PAID_ORDER_SUCCESS,
  order,
})

export const failReceiveTogglePaidOrder = (reason) => ({
  type: TOGGLE_PAID_ORDER_FAILURE,
  reason,
})

export const deleteOrder = () => ({
  type: DELETE_ORDER_REQUEST,
})

export const removeOrder = (order) => ({
  type: DELETE_ORDER_SUCCESS,
  order,
})

export const failRemoveOrder = (reason) => ({
  type: DELETE_ORDER_FAILURE,
  reason,
})

