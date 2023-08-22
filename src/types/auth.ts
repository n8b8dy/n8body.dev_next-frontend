import type { ApiResponse } from '@/types/general'

export type AmIAdminResponse = ApiResponse & {
  admin: boolean | null
}

export type LoginResponse = ApiResponse & {
  token: string | null
}
