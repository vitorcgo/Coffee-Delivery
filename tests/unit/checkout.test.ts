import { describe, expect, it } from 'vitest'
import { checkoutSchema, formatCep, type CheckoutInput } from '../../src/checkout/checkoutSchema'

const valid: CheckoutInput = {
  cep: '90200-000', street: ' Rua João Daniel Martinelli ', number: 'S/N',
  complement: '', neighborhood: 'Farrapos', city: 'Porto Alegre', state: 'rs', payment: 'credit',
}

describe('validação de checkout', () => {
  it('aceita o endereço com complemento vazio e normaliza texto e UF', () => {
    expect(checkoutSchema.parse(valid)).toMatchObject({ state: 'RS', street: 'Rua João Daniel Martinelli', complement: '' })
  })

  it('rejeita CEP, UF, endereço e pagamento inválidos', () => {
    const result = checkoutSchema.safeParse({ ...valid, cep: '12345', number: '!', city: ' ', state: 'XX', payment: undefined })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path[0])).toEqual(['cep', 'number', 'city', 'state', 'payment'])
    }
  })

  it('mantém apenas os oito dígitos do CEP e insere o hífen', () => {
    expect(formatCep('abc90.200-0009')).toBe('90200-000')
    expect(formatCep('90200')).toBe('90200')
  })
})
