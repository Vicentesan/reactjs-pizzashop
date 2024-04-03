import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-revenue-in-period', () => {
  return HttpResponse.json([
    { date: '28/02/2024', revenue: 2000 },
    { date: '29/02/2024', revenue: 800 },
    { date: '30/02/2024', revenue: 8000 },
    { date: '31/02/2024', revenue: 540 },
    { date: '01/03/2024', revenue: 400 },
    { date: '02/03/2024', revenue: 700 },
    { date: '03/03/2024', revenue: 1000 },
  ])
})
