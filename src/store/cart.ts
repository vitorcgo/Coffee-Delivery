import { coffeesById } from '../data/coffees'
import type { CheckoutDetails } from '../checkout/checkoutSchema'

export const CART_KEY = 'coffee-delivery:cart:v1'
export const MAX_QUANTITY = 99
export const DELIVERY_FEE = 350

export interface CartItem {
  coffeeId: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
  order: CheckoutDetails | null
}

export type CartAction =
  | { type: 'add' | 'quantity'; coffeeId: string; quantity: number }
  | { type: 'remove'; coffeeId: string }
  | { type: 'complete'; details: CheckoutDetails }

export function restoreItems(raw: string | null): CartItem[] {
  if (!raw) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return []
  }

  if (!Array.isArray(parsed)) return []

  const quantities = new Map<string, number>()
  for (const item of parsed) {
    if (!item || typeof item.coffeeId !== 'string' || !coffeesById.has(item.coffeeId)) continue
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) continue

    quantities.set(item.coffeeId, Math.min(MAX_QUANTITY, (quantities.get(item.coffeeId) ?? 0) + item.quantity))
  }
  return Array.from(quantities, ([coffeeId, quantity]) => ({ coffeeId, quantity }))
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === 'complete') {
    return state.items.length ? { items: [], order: action.details } : state
  }

  const { coffeeId } = action
  const existing = state.items.find((item) => item.coffeeId === coffeeId)

  if (action.type === 'remove') {
    return existing ? { ...state, items: state.items.filter((item) => item.coffeeId !== coffeeId) } : state
  }

  if (!coffeesById.has(coffeeId) || !Number.isSafeInteger(action.quantity) || action.quantity < 1) return state
  if (!existing && action.type === 'quantity') return state

  const quantity = Math.min(MAX_QUANTITY, action.quantity + (action.type === 'add' ? (existing?.quantity ?? 0) : 0))
  if (existing?.quantity === quantity) return state

  const items = existing
    ? state.items.map((item) => item.coffeeId === coffeeId ? { coffeeId, quantity } : item)
    : [...state.items, { coffeeId, quantity }]

  return { ...state, items }
}

export function getCartTotals(items: CartItem[]) {
  const count = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + (coffeesById.get(item.coffeeId)?.price ?? 0) * item.quantity, 0)
  const delivery = count > 0 ? DELIVERY_FEE : 0
  return { count, subtotal, delivery, total: subtotal + delivery }
}
