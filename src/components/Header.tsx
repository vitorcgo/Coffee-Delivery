import { Link } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { getCartTotals } from '../store/cart'
import { DesignIcon } from './DesignIcon'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { items } = useCart()
  const { count } = getCartTotals(items)
  const countLabel = count === 1 ? '1 item' : count + ' itens'

  return (
    <header className="site-header">
      <nav className="page-width header-inner flex items-center justify-between" aria-label="Navegação principal">
        <Link to="/" className="brand flex items-center" aria-label="Coffee Delivery, início">
          <img src="/brand-mark.webp" alt="" width={30} height={36} />
          <span className="brand-wordmark" aria-hidden="true"><strong>Coffee</strong><span>Delivery</span></span>
        </Link>
        <div className="header-actions flex items-center gap-3">
          <ThemeToggle />
          <span className="header-location flex items-center gap-1">
            <DesignIcon name="location" size={22} />
            <span>Porto Alegre, RS</span>
          </span>
          <Link to="/checkout" className="header-cart" aria-label={'Carrinho, ' + countLabel}>
            <DesignIcon name="cart" size={22} />
            {count > 0 && <span className="cart-badge" aria-hidden="true">{count}</span>}
          </Link>
        </div>
      </nav>
    </header>
  )
}
