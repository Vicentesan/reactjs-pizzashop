import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return

  await worker.start()
}
