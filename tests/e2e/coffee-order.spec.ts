import { expect, test, type Page } from '@playwright/test'

async function addCoffee(page: Page, name: string) {
  await page.getByRole('button', { name: 'Adicionar ' + name + ' ao carrinho', exact: true }).click()
}

async function fillAddress(page: Page) {
  await page.getByRole('textbox', { name: 'CEP', exact: true }).fill('90200000')
  await page.getByRole('textbox', { name: 'Rua', exact: true }).fill('Rua João Daniel Martinelli')
  await page.getByRole('textbox', { name: 'Número', exact: true }).fill('102')
  await page.getByRole('textbox', { name: 'Bairro', exact: true }).fill('Farrapos')
  await page.getByRole('textbox', { name: 'Cidade', exact: true }).fill('Porto Alegre')
  await page.getByRole('textbox', { name: 'UF', exact: true }).fill('rs')
}

test('finaliza o pedido após validar o carrinho, o endereço e o pagamento', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('article')).toHaveCount(14)

  await addCoffee(page, 'Expresso Tradicional')
  await page.getByRole('button', { name: 'Aumentar quantidade de Latte', exact: true }).click()
  await addCoffee(page, 'Latte')
  await page.reload()
  await page.getByRole('link', { name: 'Carrinho, 3 itens' }).click()

  const summary = page.getByRole('region', { name: 'Cafés selecionados' })
  await expect(summary.getByText(/R\$\s*33,20/)).toBeVisible()
  await page.getByRole('button', { name: 'Confirmar pedido' }).click()
  await expect(page.getByText('Informe um CEP com 8 dígitos.')).toBeVisible()
  await expect(page.getByText('Selecione uma forma de pagamento.')).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'CEP', exact: true })).toBeFocused()

  await fillAddress(page)
  await expect(page.getByRole('textbox', { name: 'CEP', exact: true })).toHaveValue('90200-000')
  await page.getByText('Cartão de Crédito', { exact: true }).click()
  await expect(page.getByRole('radio', { name: 'Cartão de Crédito' })).toBeChecked()
  await page.getByRole('button', { name: 'Confirmar pedido' }).click()
  await expect(page).toHaveURL(/\/success$/)
  await expect(page.getByRole('heading', { name: 'Uhu! Pedido confirmado' })).toBeVisible()
  await expect(page.getByText('Rua João Daniel Martinelli, 102')).toBeVisible()
  await expect(page.getByText('Cartão de Crédito')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Carrinho, 0 itens' })).toBeVisible()
  expect(await page.evaluate(() => localStorage.getItem('coffee-delivery:cart:v1'))).toBe('[]')
  expect(errors).toEqual([])
})

test('altera, remove e impede a confirmação com o carrinho vazio', async ({ page }) => {
  await page.goto('/')
  await addCoffee(page, 'Expresso Tradicional')
  await page.getByRole('link', { name: 'Carrinho, 1 item' }).click()
  await page.getByRole('button', { name: 'Aumentar quantidade de Expresso Tradicional' }).click()
  await expect(page.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeVisible()
  await page.getByRole('button', { name: 'Diminuir quantidade de Expresso Tradicional' }).click()
  await expect(page.getByRole('link', { name: 'Carrinho, 1 item' })).toBeVisible()
  await page.getByRole('button', { name: 'Remover Expresso Tradicional' }).click()
  await expect(page.getByText('Seu carrinho está vazio.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Confirmar pedido' })).toHaveCount(0)
  await page.getByRole('link', { name: 'Ver nossos cafés' }).click()
  await expect(page.getByRole('heading', { name: 'Nossos cafés' })).toBeVisible()
})

test('mantém a preferência de tema e o layout dentro da largura em celular e tablet', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  const theme = page.getByRole('button', { name: 'Tema escuro' })
  await theme.click()
  await expect(theme).toHaveAttribute('aria-pressed', 'true')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)

  await addCoffee(page, 'Chocolate Quente')
  await page.getByRole('link', { name: 'Carrinho, 1 item' }).click()
  await expect(page.getByRole('textbox', { name: 'Complemento (opcional)' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)

  await page.setViewportSize({ width: 768, height: 1024 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(768)
  await theme.click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('redireciona a confirmação sem pedido ativo', async ({ page }) => {
  await page.goto('/success')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Nossos cafés' })).toBeVisible()
})
