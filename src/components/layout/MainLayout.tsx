import type { FC, ReactNode } from 'react'

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <main className="container mx-auto px-4">
    {children}
  </main>
}
