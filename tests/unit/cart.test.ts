import { describe, expect, it } from 'vitest'
import { cartReducer, getCartTotals, MAX_QUANTITY, restoreItems, type CartState } from '../../src/store/cart'

const traditional = 'expresso-tradicional'
const latte = 'latte'
const empty: CartState = { items: [], order: null }
const details = {
  cep: '90200-000', street: 'Rua João Daniel Martinelli', number: '102',
  complement: '', neighborhood: 'Farrapos', city: 'Porto Alegre', state: 'RS', payment: 'credit',
} as const

describe('carrinho', () => {
  it('acumula quantidades do mesmo café, altera e remove itens', () => {
    const first = cartReducer(empty, { type: 'add', coffeeId: traditional, quantity: 2 })
    const second = cartReducer(first, { type: 'add', coffeeId: traditional, quantity: 3 })
    const updated = cartReducer(second, { type: 'quantity', coffeeId: traditional, quantity: 1 })
    const removed = cartReducer(updated, { type: 'remove', coffeeId: traditional })

    expect(first.items).toEqual([{ coffeeId: traditional, quantity: 2 }])
    expect(second.items).toEqual([{ coffeeId: traditional, quantity: 5 }])
    expect(updated.items).toEqual([{ coffeeId: traditional, quantity: 1 }])
    expect(removed).toEqual(empty)
  })

  it('limita cada produto e ignora quantidades e IDs inválidos', () => {
    const valid = cartReducer(empty, { type: 'add', coffeeId: traditional, quantity: MAX_QUANTITY })
    expect(cartReducer(valid, { type: 'add', coffeeId: traditional, quantity: 3 })).toBe(valid)
    expect(cartReducer(valid, { type: 'quantity', coffeeId: traditional, quantity: 0 })).toBe(valid)
    expect(cartReducer(valid, { type: 'add', coffeeId: 'desconhecido', quantity: 1 })).toBe(valid)
  })

  it('calcula total e entrega em centavos e zera a entrega para um carrinho vazio', () => {
    expect(getCartTotals([{ coffeeId: traditional, quantity: 1 }, { coffeeId: latte, quantity: 2 }]))
      .toEqual({ count: 3, subtotal: 2970, delivery: 350, total: 3320 })
    expect(getCartTotals([])).toEqual({ count: 0, subtotal: 0, delivery: 0, total: 0 })
  })

  it('recupera somente linhas válidas de um carrinho persistido', () => {
    expect(restoreItems('{')).toEqual([])
    expect(restoreItems('{}')).toEqual([])
    expect(restoreItems(JSON.stringify([
      null, { coffeeId: traditional, quantity: 1 }, { coffeeId: traditional, quantity: 2 },
      { coffeeId: latte, quantity: -5 }, { coffeeId: 'inexistente', quantity: 1 },
    ]))).toEqual([{ coffeeId: traditional, quantity: 3 }])
  })

  it('finaliza apenas com itens e limpa o carrinho depois da confirmação', () => {
    expect(cartReducer(empty, { type: 'complete', details })).toBe(empty)
    const full = cartReducer(empty, { type: 'add', coffeeId: latte, quantity: 1 })
    const complete = cartReducer(full, { type: 'complete', details })
    expect(complete).toEqual({ items: [], order: details })
    expect(cartReducer(complete, { type: 'complete', details })).toBe(complete)
  })
})
