import type { ApiResponse, BaseDTO } from '@/types/general'

export type SectionDTO = BaseDTO & {
  position: number
  heading: string
  paragraphs: Array<string>
}

export type SectionsResponse = ApiResponse & {
  sections: Array<SectionDTO> | null
}
