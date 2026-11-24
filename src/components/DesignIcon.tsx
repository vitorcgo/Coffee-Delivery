type DesignIconName =
  | 'add-cart' | 'address' | 'benefit-cart' | 'benefit-coffee' | 'benefit-package'
  | 'benefit-timer' | 'cart' | 'cash' | 'credit' | 'debit' | 'delivery-location'
  | 'delivery-payment' | 'delivery-timer' | 'location' | 'minus' | 'minus-hover'
  | 'payment' | 'plus' | 'plus-hover' | 'trash' | 'trash-hover'

export function DesignIcon({ name, size = 16, className }: {
  name: DesignIconName
  size?: number
  className?: string
}) {
  return <img src={'/design/icons/' + name + '.svg'} width={size} height={size} alt="" className={className} />
}
