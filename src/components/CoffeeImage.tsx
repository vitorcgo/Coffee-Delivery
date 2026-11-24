import type { Coffee } from '../data/coffees'

export function CoffeeImage({ coffee, size, className }: { coffee: Coffee; size: number; className?: string }) {
  return (
    <img
      src={'/design/coffees/' + coffee.id + '.png'}
      width={size}
      height={size}
      alt=""
      className={(className ?? '') + (coffee.rotateImage ? ' rotate-180' : '')}
    />
  )
}
