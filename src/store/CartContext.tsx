import { createContext, useCallback, useContext, useEffect, useReducer, useRef, type Dispatch, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { CART_KEY, cartReducer, restoreItems, type CartAction, type CartItem, type CartState } from './cart'

const CartContext = createContext<(CartState & { dispatch: Dispatch<CartAction> }) | null>(null)

type StoreAction = CartAction | { type: 'sync'; items: CartItem[] }
type StoreState = { cart: CartState; shouldPersist: boolean }

function reduceStore(state: StoreState, action: StoreAction): StoreState {
  if (action.type === 'sync') {
    return { cart: { ...state.cart, items: action.items }, shouldPersist: false }
  }

  const cart = cartReducer(state.cart, action)
  return cart === state.cart ? state : { cart, shouldPersist: true }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [{ cart, shouldPersist }, send] = useReducer(reduceStore, undefined, () => ({
    cart: { items: restoreItems(readStorage(CART_KEY) ?? null), order: null },
    shouldPersist: false,
  }))
  const observedStorage = useRef<string | null>(null)

  const syncFromStorage = useCallback(() => {
    const stored = readStorage(CART_KEY)
    if (stored === undefined || stored === observedStorage.current) return

    observedStorage.current = stored
    send({ type: 'sync', items: restoreItems(stored) })
  }, [])

  const dispatch = useCallback((action: CartAction) => {
    syncFromStorage()
    send(action)
  }, [syncFromStorage])

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === CART_KEY || event.key === null) {
        syncFromStorage()
      }
    }

    window.addEventListener('storage', handleStorage)
    syncFromStorage()
    return () => window.removeEventListener('storage', handleStorage)
  }, [syncFromStorage])

  useEffect(() => {
    if (!shouldPersist) return

    const stored = JSON.stringify(cart.items)
    if (writeStorage(CART_KEY, stored)) observedStorage.current = stored
  }, [cart.items, shouldPersist])

  return <CartContext.Provider value={{ ...cart, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart precisa de CartProvider.')
  return cart
}
