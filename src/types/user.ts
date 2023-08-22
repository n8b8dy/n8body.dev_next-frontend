import type { ApiResponse, BaseDTO } from '@/types/general'

export type UserDTO = BaseDTO & {
  username: string
  email: string
  admin: boolean
}

export type UserResponse = ApiResponse & {
  user: UserDTO | null
}
