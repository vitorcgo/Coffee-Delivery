import { DesignIcon } from './DesignIcon'

interface QuantityInputProps {
  product: string
  value: number
  max: number
  onChange: (value: number) => void
  compact?: boolean
}

export function QuantityInput({ product, value, max, onChange, compact }: QuantityInputProps) {
  return (
    <div className={compact ? 'quantity quantity-compact' : 'quantity'} role="group" aria-label={'Quantidade de ' + product}>
      <button type="button" aria-label={'Diminuir quantidade de ' + product} disabled={value <= 1} onClick={() => onChange(value - 1)}>
        <DesignIcon name="minus" size={14} className="icon-default" />
        <DesignIcon name="minus-hover" size={14} className="icon-hover" />
      </button>
      <output aria-label={'Quantidade atual de ' + product}>{value}</output>
      <button type="button" aria-label={'Aumentar quantidade de ' + product} disabled={value >= max} onClick={() => onChange(value + 1)}>
        <DesignIcon name="plus" size={14} className="icon-default" />
        <DesignIcon name="plus-hover" size={14} className="icon-hover" />
      </button>
    </div>
  )
}
