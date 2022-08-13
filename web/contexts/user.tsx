import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { useStore } from 'zustand'
import { StoreContext } from './store'
import nookies from 'nookies'

export interface UserContextProps {}
const UserContext = createContext<UserContextProps>({} as any)

export const UserProvider = (props: PropsWithChildren<UserContextProps>) => {
	const { push, pathname, events } = useRouter()

	const store = useContext(StoreContext)
	const setUser = useStore(store, (state) => state.setUser)
	const user = useStore(store, (state) => state.user)

	const fetchUserInfo = async () => {
		fetch('http://localhost:3001/users/whoami', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${nookies.get(null, 'jwt').jwt}`
			}
		})
			.then(async (res) => {
				const user = await res.json()
				if (user && user.providerId) {
					setUser(user)
				}
			})
			.catch()
	}

	useEffect(() => {
		fetchUserInfo().then(() => {
			if (!user || (user && !user.providerId)) {
				push('/')
			}
		})
	}, [])

	useEffect(() => {
		if (pathname === '/' && user && user.providerId) {
			push('/dashboard')
		} else if (user && !user.providerId) {
			push('/')
		}
	}, [user])

	useEffect(() => {
		if (events) {
			events.on('routeChangeComplete', fetchUserInfo)
		}
	}, [])

	return <UserContext.Provider value={props}>{props.children}</UserContext.Provider>
}
