import { useState } from 'react'
import { CatalogCard } from '../components/CatalogCard'
import { FeatureIcon } from '../components/FeatureIcon'
import { coffees, type Coffee } from '../data/coffees'
import { useCart } from '../store/CartContext'
import { MAX_QUANTITY } from '../store/cart'

const benefits = [
  { icon: 'benefit-cart', color: 'gold-dark', text: 'Compra simples e segura' },
  { icon: 'benefit-package', color: 'coffee', text: 'Embalagem mantém o café intacto' },
  { icon: 'benefit-timer', color: 'gold', text: 'Entrega rápida e rastreada' },
  { icon: 'benefit-coffee', color: 'purple', text: 'O café chega fresquinho até você' },
] as const

export function Home() {
  const { items, dispatch } = useCart()
  const [lastAdded, setLastAdded] = useState<{ count: number; name: string; sequence: number } | null>(null)

  function addCoffee(coffee: Coffee, quantity: number) {
    dispatch({ type: 'add', coffeeId: coffee.id, quantity })
    setLastAdded((previous) => ({ count: quantity, name: coffee.name, sequence: (previous?.sequence ?? 0) + 1 }))
  }

  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="hero relative overflow-hidden" aria-labelledby="home-title">
        <img className="hero-background" src="/design/illustrations/intro-background.svg" width={1760} height={704} alt="" />
        <div className="page-width hero-inner relative">
          <div className="hero-copy">
            <h1 id="home-title">Encontre o café perfeito para qualquer hora do dia</h1>
            <p className="hero-description">Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</p>
            <ul className="hero-benefits grid">
              {benefits.map(({ icon, color, text }) => (
                <li key={icon} className="flex items-center gap-3">
                  <FeatureIcon name={icon} color={color} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <img className="hero-coffee" src="/design/illustrations/intro-cup.png" width={476} height={360} alt="" fetchPriority="high" />
        </div>
      </section>
      <section className="page-width catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Nossos cafés</h2>
        <div className="catalog-grid grid">
          {coffees.map((coffee) => (
            <CatalogCard
              key={coffee.id}
              coffee={coffee}
              available={MAX_QUANTITY - (items.find((item) => item.coffeeId === coffee.id)?.quantity ?? 0)}
              onAdd={addCoffee}
            />
          ))}
        </div>
        <p className="sr-only" role="status">
          {lastAdded && <span key={lastAdded.sequence}>{lastAdded.count} × {lastAdded.name} no carrinho.</span>}
        </p>
      </section>
    </main>
  )
}
