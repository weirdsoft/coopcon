export const getProduct = (state, id) => state.product.byId[id]
export const isAddingProduct = (state) => state.product.isAdding
export const getNewProduct = (state) => state.product.newProduct
