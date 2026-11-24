import { Navigate } from 'react-router-dom'
import { payments } from '../checkout/checkoutSchema'
import { FeatureIcon } from '../components/FeatureIcon'
import { useCart } from '../store/CartContext'

export function Success() {
  const { order } = useCart()
  if (!order) return <Navigate to="/" replace />

  const paymentLabel = payments.find((payment) => payment.value === order.payment)?.label

  return (
    <main id="conteudo" tabIndex={-1} className="page-width success-page">
      <h1>Uhu! Pedido confirmado</h1>
      <p className="success-subtitle">Agora é só aguardar que logo o café chegará até você</p>
      <div className="success-content grid">
        <ul className="success-details flex flex-col">
          <li>
            <FeatureIcon name="delivery-location" color="purple" />
            <p>
              Entrega em <strong>{order.street}, {order.number}{order.complement && ' — ' + order.complement}</strong>
              <br />{order.neighborhood} - {order.city}, {order.state}
            </p>
          </li>
          <li>
            <FeatureIcon name="delivery-timer" color="gold" />
            <p>Previsão de entrega<br /><strong>20 min - 30 min</strong></p>
          </li>
          <li>
            <FeatureIcon name="delivery-payment" color="gold-dark" />
            <p>Pagamento na entrega<br /><strong>{paymentLabel}</strong></p>
          </li>
        </ul>
        <img className="success-illustration" src="/design/illustrations/delivery.svg" width={492} height={293} alt="" />
      </div>
    </main>
  )
}
