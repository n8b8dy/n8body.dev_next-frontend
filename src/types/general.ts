export type ApiResponse = {
  error: ErrorDTO | null
}

export type ErrorDTO = {
  status: number
  reason: string
}

export type BaseDTO = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
