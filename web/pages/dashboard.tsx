import { useContext } from 'react'
import { useStore } from 'zustand'
import { StoreContext } from '../contexts/store'
import nookies from 'nookies'
import { useRouter } from 'next/router'

export default function Dashboard(): JSX.Element {
	const store = useContext(StoreContext)
	const user = useStore(store, (state) => state.user)
	const push = useRouter().push
	return (
		<div>
			<h1>Dashboard</h1>
			<p>{user?.name}</p>
			<button
				onClick={() => {
					nookies.destroy(null, 'jwt')
					push('/')
				}}>
				Logout
			</button>
		</div>
	)
}
