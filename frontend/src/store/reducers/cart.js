import { handleFetchAction } from '$src/lib/action'
import { 
  fetchCart, 
  setCartItemQuantity,
  updateCartItem,
  deleteCartItem,
} from '$act/cart'

export default handleFetchAction(fetchCart, {
  [setCartItemQuantity]: (state, { payload: { i, val } }) => ({
    ...state,
    data: state.data.map((item, j) => {
      if (j === i) {
        return {
          ...item,
          quantity: val,
          _dirty: true
        }
      }
      return item
    })
  }),
  [updateCartItem.success]: (state, { payload: { data } }) => ({
    ...state,
    data: state.data.map(item => {
      if (item.item_id === data.item_id) {
        return { ...data }
      }
      return item
    })
  }),
  [deleteCartItem]: (state, { payload: { item } }) => ({
    ...state,
    data: state.data.filter(it => it.item_id !== item.item_id)
  })
})