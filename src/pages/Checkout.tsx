import { useNavigate } from 'react-router-dom'
import { CartSummary } from '../checkout/CartSummary'
import { CheckoutForm } from '../checkout/CheckoutForm'
import type { CheckoutDetails } from '../checkout/checkoutSchema'
import { useCart } from '../store/CartContext'

export function Checkout() {
  const { items, dispatch } = useCart()
  const navigate = useNavigate()

  function confirmOrder(details: CheckoutDetails) {
    if (!items.length) return

    dispatch({ type: 'complete', details })
    void navigate('/success', { replace: true })
  }

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
