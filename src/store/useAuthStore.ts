import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
  username: string
  role: string
}

interface AuthState {
  isAuthenticated: boolean
  userInfo: UserInfo | null
  login: (userInfo: UserInfo) => void
  logout: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userInfo: null,
      login: (userInfo) => set({ isAuthenticated: true, userInfo }),
      logout: () => set({ isAuthenticated: false, userInfo: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)

export default useAuthStore
