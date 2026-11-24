import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CartSummary } from '../checkout/CartSummary'
import { CheckoutForm } from '../checkout/CheckoutForm'
import type { CheckoutDetails } from '../checkout/checkoutSchema'
import { useCart } from '../store/CartContext'

export function Checkout() {
  const { items, order, dispatch } = useCart()
  const [orderAtEntry] = useState(order)

  function confirmOrder(details: CheckoutDetails) {
    dispatch({ type: 'complete', details })
  }

  if (order && order !== orderAtEntry) return <Navigate to="/success" replace />

  return (
    <main id="conteudo" tabIndex={-1} className="page-width checkout-grid grid">
      <div className="min-w-0">
        <h1 className="checkout-heading">Complete seu pedido</h1>
        {items.length > 0 && <CheckoutForm onConfirm={confirmOrder} />}
      </div>
      <CartSummary />
    </main>
  )
}
