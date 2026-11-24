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
  const cep = page.getByRole('textbox', { name: 'CEP', exact: true })
  await expect(cep).toBeFocused()
  await expect(cep).toHaveCSS('outline-color', 'rgb(196, 127, 23)')
  await expect(cep).toHaveCSS('outline-style', 'solid')

  await fillAddress(page)
  await expect(cep).toHaveValue('90200-000')
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
  await page.getByRole('button', { name: 'Remover Expresso Tradicional' }).press('Enter')
  await expect(page.getByText('Seu carrinho está vazio.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Confirmar pedido' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Cafés selecionados' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Ver nossos cafés' })).toBeFocused()
  await page.keyboard.press('Enter')
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

test('mantém o carrinho sincronizado entre abas até a confirmação', async ({ page, context }) => {
  const otherTab = await context.newPage()
  await Promise.all([page.goto('/'), otherTab.goto('/')])

  await addCoffee(page, 'Latte')
  await expect(otherTab.getByRole('link', { name: 'Carrinho, 1 item' })).toBeVisible()
  await addCoffee(otherTab, 'Capuccino')
  await expect(page.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeVisible()

  await otherTab.getByRole('link', { name: 'Carrinho, 2 itens' }).click()
  await expect(otherTab.getByText('Latte', { exact: true })).toBeVisible()
  await expect(otherTab.getByText('Capuccino', { exact: true })).toBeVisible()
  await fillAddress(otherTab)
  await otherTab.getByText('Dinheiro', { exact: true }).click()
  await otherTab.getByRole('button', { name: 'Confirmar pedido' }).click()

  await expect(otherTab.getByRole('heading', { name: 'Uhu! Pedido confirmado' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Carrinho, 0 itens' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('link', { name: 'Carrinho, 0 itens' })).toBeVisible()
})

test('aceita CEP com pontuação ao colar e preserva a edição no meio do campo', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  await addCoffee(page, 'Latte')
  await page.getByRole('link', { name: 'Carrinho, 1 item' }).click()

  const cep = page.getByRole('textbox', { name: 'CEP', exact: true })
  await page.evaluate(() => navigator.clipboard.writeText('90.237-614'))
  await cep.press('ControlOrMeta+V')
  await expect(cep).toHaveValue('90237-614')

  await cep.evaluate((input: HTMLInputElement) => input.setSelectionRange(5, 5))
  await cep.press('Delete')
  await expect(cep).toHaveValue('90237-14')

  await cep.evaluate((input: HTMLInputElement) => input.setSelectionRange(2, 2))
  await cep.press('Backspace')
  await expect(cep).toHaveValue('92371-4')
  expect(await cep.evaluate((input: HTMLInputElement) => input.selectionStart)).toBe(1)
  await cep.press('0')
  await expect(cep).toHaveValue('90237-14')
})

test('mantém o carrinho em memória se o armazenamento ficar indisponível', async ({ page }) => {
  await page.goto('/')
  await addCoffee(page, 'Latte')
  await expect(page.getByRole('link', { name: 'Carrinho, 1 item' })).toBeVisible()

  await page.evaluate(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('Armazenamento bloqueado', 'SecurityError')
      },
    })
  })

  await addCoffee(page, 'Capuccino')
  await page.getByRole('link', { name: 'Carrinho, 2 itens' }).click()
  await expect(page.getByText('Latte', { exact: true })).toBeVisible()
  await expect(page.getByText('Capuccino', { exact: true })).toBeVisible()
})
