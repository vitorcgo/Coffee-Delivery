import { useState } from 'react'
import type { Coffee } from '../data/coffees'
import { formatAmount } from '../lib/money'
import { Button } from './Button'
import { CoffeeImage } from './CoffeeImage'
import { DesignIcon } from './DesignIcon'
import { QuantityInput } from './QuantityInput'

interface CatalogCardProps {
  coffee: Coffee
  available: number
  onAdd: (coffee: Coffee, quantity: number) => void
}

export function CatalogCard({ coffee, available, onAdd }: CatalogCardProps) {
  const [desiredQuantity, setQuantity] = useState(1)
  const quantity = Math.min(desiredQuantity, Math.max(1, available))
  const addLabel = available ? 'Adicionar ' + coffee.name + ' ao carrinho' : 'Limite de ' + coffee.name + ' atingido'

  return (
    <article className="catalog-card">
      <CoffeeImage coffee={coffee} size={120} className="catalog-coffee" />
      <ul className="catalog-tags flex flex-wrap justify-center gap-1" aria-label="Categorias">
        {coffee.tags.map((tag) => <li key={tag} className="coffee-tag">{tag}</li>)}
      </ul>
      <h3 className="catalog-card-title">{coffee.name}</h3>
      <p className="catalog-description">{coffee.description}</p>
      <div className="catalog-buy flex flex-wrap items-center justify-between gap-2">
        <p className="catalog-price">R$ <strong>{formatAmount(coffee.price)}</strong></p>
        <div className="flex items-center gap-2">
          <QuantityInput product={coffee.name} value={quantity} max={available} onChange={setQuantity} />
          <Button variant="icon" aria-label={addLabel} title={addLabel} disabled={!available} onClick={() => {
            onAdd(coffee, quantity)
            setQuantity(1)
          }}>
            <DesignIcon name="add-cart" size={22} />
          </Button>
        </div>
      </div>
    </article>
  )
}
