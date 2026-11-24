import type { ComponentProps } from 'react'

type AddressFieldProps = ComponentProps<'input'> & {
  label: string
  error?: string
  optional?: boolean
}

export function AddressField({ label, error, optional, className = '', ...input }: AddressFieldProps) {
  const id = 'address-' + input.name
  const errorId = id + '-error'
  return (
    <div className={'min-w-0 ' + className}>
      <label className="sr-only" htmlFor={id}>{label}{optional ? ' (opcional)' : ''}</label>
      <div className="address-field">
        <input {...input} id={id} placeholder={label} aria-required={!optional} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
        {optional && <span className="address-optional" aria-hidden="true">Opcional</span>}
      </div>
      {error && <p className="field-error" id={errorId}>{error}</p>}
    </div>
  )
}
