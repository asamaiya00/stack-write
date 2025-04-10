import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Models, ID, AppwriteException } from 'appwrite'

import { account } from '@/models/client/config'

export interface UserPrefs {
  reputation: number
}

interface IAuthStore {
  session: Models.Session | null
  user: Models.User<UserPrefs> | null
  jwt: string | null
  isHydrated: boolean

  setHyrated(): void
  verifySession(): void
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean
    error?: AppwriteException | null
  }>
  logout(): Promise<void>
  createAccount(
    email: string,
    password: string,
    name: string
  ): Promise<{
    success: boolean
    error?: AppwriteException | null
  }>
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      user: null,
      jwt: null,
      isHydrated: false,

      setHyrated() {
        set({ isHydrated: true })
      },
      verifySession: async () => {
        try {
          const session = await account.getSession('current')
          await account.get()
          set({ session })
        } catch (error) {
          console.log(error)
        }
      },
      async login(email, password) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          )
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ])
          if (!user.prefs?.reputation) {
            await account.updatePrefs<UserPrefs>({ reputation: 0 })
          }
          set({ session, user, jwt })
          return { success: true, error: null }
        } catch (error) {
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          }
        }
      },

      logout: async () => {
        try {
          await account.deleteSession('current')
          set({ session: null, user: null, jwt: null, isHydrated: false })
        } catch (error) {
          console.log(error)
        }
      },
      
      createAccount: async (email, password, name) => {
        try {
          await account.create(ID.unique(), email, password, name)
          return { success: true, error: null }
        } catch (error) {
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          }
        }
      },
    })),
    {
      name: 'auth',
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHyrated()
        }
      },
    }
  )
)
