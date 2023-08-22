import type { ApiResponse, BaseDTO } from '@/types/general'

export type MessageDTO = BaseDTO & {
  text: string
  username: string
  email: string
}

export type MessageResponse = ApiResponse &  {
  message: MessageDTO | null
}

export type MessagesResponse = ApiResponse &  {
  messages: Array<MessageDTO> | null
}
