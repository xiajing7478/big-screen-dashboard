import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeKey } from '../themes/themes'

interface ThemeState {
  theme: ThemeKey
  setTheme: (theme: ThemeKey) => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme: ThemeKey) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    },
  ),
)

export default useThemeStore
