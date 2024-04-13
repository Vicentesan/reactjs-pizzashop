import { expect, test } from '@playwright/test'

import {
  mockedManagerEmail,
  mockedManagerName,
  mockedManagerPhone,
  mockedRestaurantName,
} from './utils'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do Estabelecimento').fill(mockedRestaurantName)
  await page.getByLabel('Seu nome').fill(mockedManagerName)
  await page.getByLabel('Seu e-mail').fill(mockedManagerEmail)
  await page.getByLabel('Seu celular').fill(mockedManagerPhone)

  await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

  const toast = page.getByText(
    `Restaurante "${mockedRestaurantName}" cadastrado com sucesso.`,
  )

  await expect(toast).toBeVisible()
})

test('sign up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do Estabelecimento').fill('wrong restaurant name')
  await page.getByLabel('Seu nome').fill('wrong manager name')
  await page.getByLabel('Seu e-mail').fill('wrong@email.com')
  await page.getByLabel('Seu celular').fill('99999999991')

  await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  await expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer Login' }).click()

  expect(page.url()).toContain('/sign-in')
})
