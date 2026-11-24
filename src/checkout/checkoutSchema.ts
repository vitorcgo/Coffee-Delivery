import { z } from 'zod'

export const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

export const payments = [
  { value: 'credit', label: 'Cartão de Crédito', icon: 'credit' },
  { value: 'debit', label: 'Cartão de Débito', icon: 'debit' },
  { value: 'cash', label: 'Dinheiro', icon: 'cash' },
] as const

export function formatCep(value: string) {
  const numbers = value.replace(/\D/g, '').slice(0, 8)
  return numbers.length > 5 ? numbers.slice(0, 5) + '-' + numbers.slice(5) : numbers
}

export const checkoutSchema = z.object({
  cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP com 8 dígitos.'),
  street: z.string().trim().min(2, 'Informe a rua.').max(120, 'Use até 120 caracteres.'),
  number: z.string().trim().regex(/^(?:\d+[A-Za-z]?|s\/?n)$/i, 'Informe o número ou S/N.').max(12, 'Use até 12 caracteres.'),
  complement: z.string().trim().max(80, 'Use até 80 caracteres.'),
  neighborhood: z.string().trim().min(2, 'Informe o bairro.').max(80, 'Use até 80 caracteres.'),
  city: z.string().trim().min(2, 'Informe a cidade.').max(80, 'Use até 80 caracteres.'),
  state: z.string().trim().toUpperCase().pipe(z.enum(states, { error: 'Informe uma UF brasileira.' })),
  payment: z.enum(['credit', 'debit', 'cash'], { error: 'Selecione uma forma de pagamento.' }),
})

export type CheckoutInput = z.input<typeof checkoutSchema>
export type CheckoutDetails = z.output<typeof checkoutSchema>
