import { Comfortaa, Fredoka, Varela_Round } from 'next/font/google'

export const FredokaFont = Fredoka({
  subsets: ['latin-ext'],
  weight: ['400'],
})

export const ComfortaaFont = Comfortaa({
  subsets: ['latin-ext', 'cyrillic-ext'],
  weight: ['400'],
})

export const VarelaRoundFont = Varela_Round({
  subsets: ['latin-ext'],
  weight: ['400'],
  fallback: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'],
})
