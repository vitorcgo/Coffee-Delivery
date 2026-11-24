import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DesignIcon } from '../components/DesignIcon'
import { AddressField } from './AddressField'
import { checkoutSchema, formatCep, payments, type CheckoutDetails, type CheckoutInput } from './checkoutSchema'

export const CHECKOUT_FORM_ID = 'checkout-form'

export function CheckoutForm({ onConfirm }: { onConfirm: (details: CheckoutDetails) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutInput, unknown, CheckoutDetails>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' },
  })

  const cep = register('cep')
  const state = register('state')

  return (
    <form id={CHECKOUT_FORM_ID} className="flex flex-col gap-3" noValidate onSubmit={handleSubmit(onConfirm)}>
      <section className="form-panel flex flex-col" aria-labelledby="delivery-heading">
        <div className="panel-heading flex items-start gap-2">
          <DesignIcon name="address" size={22} />
          <div>
            <h2 id="delivery-heading">Endereço de Entrega</h2>
            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </div>
        <div className="address-grid grid">
          <AddressField className="address-cep" label="CEP" autoComplete="postal-code" inputMode="numeric" maxLength={9} error={errors.cep?.message} {...cep} onChange={(event) => {
            event.currentTarget.value = formatCep(event.currentTarget.value)
            void cep.onChange(event)
          }} />
          <AddressField className="address-street" label="Rua" autoComplete="address-line1" maxLength={120} error={errors.street?.message} {...register('street')} />
          <AddressField className="address-number" label="Número" maxLength={12} error={errors.number?.message} {...register('number')} />
          <AddressField className="address-complement" label="Complemento" autoComplete="address-line2" maxLength={80} optional error={errors.complement?.message} {...register('complement')} />
          <AddressField className="address-neighborhood" label="Bairro" autoComplete="address-level3" maxLength={80} error={errors.neighborhood?.message} {...register('neighborhood')} />
          <AddressField className="address-city" label="Cidade" autoComplete="address-level2" maxLength={80} error={errors.city?.message} {...register('city')} />
          <AddressField className="address-state" label="UF" autoComplete="address-level1" autoCapitalize="characters" maxLength={2} error={errors.state?.message} {...state} onChange={(event) => {
            event.currentTarget.value = event.currentTarget.value.toUpperCase()
            void state.onChange(event)
          }} />
        </div>
      </section>
      <fieldset className="form-panel min-w-0" aria-describedby={errors.payment ? 'payment-help payment-error' : 'payment-help'}>
        <legend className="sr-only">Pagamento</legend>
        <div className="panel-heading flex items-start gap-2">
          <DesignIcon name="payment" size={22} className="purple-icon" />
          <div>
            <p className="panel-heading-title" aria-hidden="true">Pagamento</p>
            <p id="payment-help">O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
          </div>
        </div>
        <div className="payment-options grid gap-3">
          {payments.map(({ value, label, icon }) => (
            <label className="payment-option" key={value}>
              <input className="sr-only" type="radio" value={value} aria-invalid={Boolean(errors.payment)} {...register('payment')} />
              <span className="payment-option-content">
                <DesignIcon name={icon} className="purple-icon" />
                {label}
              </span>
            </label>
          ))}
        </div>
        {errors.payment && <p className="field-error" id="payment-error">{errors.payment.message}</p>}
      </fieldset>
    </form>
  )
}
