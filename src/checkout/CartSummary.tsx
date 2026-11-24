import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { CoffeeImage } from '../components/CoffeeImage'
import { DesignIcon } from '../components/DesignIcon'
import { QuantityInput } from '../components/QuantityInput'
import { coffeesById } from '../data/coffees'
import { formatMoney } from '../lib/money'
import { useCart } from '../store/CartContext'
import { getCartTotals, MAX_QUANTITY } from '../store/cart'
import { CHECKOUT_FORM_ID } from './CheckoutForm'

export function CartSummary() {
  const { items, dispatch } = useCart()
  const { subtotal, delivery, total } = getCartTotals(items)

  return (
    <section aria-labelledby="cart-heading">
      <h2 id="cart-heading" className="checkout-heading">Cafés selecionados</h2>
      <div className="cart-summary">
        {items.length === 0 ? (
          <div className="flex flex-col gap-4">
            <p>Seu carrinho está vazio.</p>
            <Link className="text-link self-start" to="/">Ver nossos cafés</Link>
          </div>
        ) : (
          <>
            <ul className="cart-items flex flex-col">
              {items.map(({ coffeeId, quantity }) => {
                const coffee = coffeesById.get(coffeeId)
                if (!coffee) return null
                return (
                  <li key={coffeeId}>
                    <div className="cart-line">
                      <CoffeeImage coffee={coffee} size={64} className="cart-coffee" />
                      <div className="cart-line-details">
                        <p>{coffee.name}</p>
                        <div className="cart-line-controls flex flex-wrap gap-2">
                          <QuantityInput compact product={coffee.name} value={quantity} max={MAX_QUANTITY} onChange={(value) => dispatch({ type: 'quantity', coffeeId, quantity: value })} />
                          <Button variant="secondary" aria-label={'Remover ' + coffee.name} onClick={() => dispatch({ type: 'remove', coffeeId })}>
                            <DesignIcon name="trash" className="icon-default" />
                            <DesignIcon name="trash-hover" className="icon-hover" />
                            Remover
                          </Button>
                        </div>
                      </div>
                      <strong className="cart-line-price">{formatMoney(coffee.price * quantity)}</strong>
                    </div>
                    <img className="cart-divider" src="/design/icons/divider.svg" width={368} height={1} alt="" />
                  </li>
                )
              })}
            </ul>
            <dl className="order-totals flex flex-col gap-3">
              <div><dt>Total de itens</dt><dd>{formatMoney(subtotal)}</dd></div>
              <div><dt>Entrega</dt><dd>{formatMoney(delivery)}</dd></div>
              <div className="order-total"><dt>Total</dt><dd>{formatMoney(total)}</dd></div>
            </dl>
            <Button type="submit" form={CHECKOUT_FORM_ID}>Confirmar pedido</Button>
          </>
        )}
      </div>
    </section>
  )
}
