import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { CART_KEY, cartReducer, restoreItems, type CartAction, type CartState } from './cart'

const CartContext = createContext<(CartState & { dispatch: Dispatch<CartAction> }) | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({
    items: restoreItems(readStorage(CART_KEY)),
    order: null,
  }))

  useEffect(() => {
    writeStorage(CART_KEY, JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ ...state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart precisa de CartProvider.')
  return cart
}
