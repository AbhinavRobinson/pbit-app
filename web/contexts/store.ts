import { createStore, StoreApi } from 'zustand'
import { UserWithoutPassword } from '../../server/src/users/schemas/user.schema'
import { createContext } from 'react'

export interface StoreState {
	user: UserWithoutPassword | null
	setUser: (user: UserWithoutPassword) => void
}

export const store = createStore<StoreState>((set) => ({
	user: null,
	setUser: (user) => set({ user })
}))

export const StoreContext = createContext<StoreApi<StoreState>>({} as any)
