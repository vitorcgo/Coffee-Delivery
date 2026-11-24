const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const decimal = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const formatMoney = (cents: number) => currency.format(cents / 100)
export const formatAmount = (cents: number) => decimal.format(cents / 100)
