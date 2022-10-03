import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import Auth from '../components/Auth'
import { useEffect } from 'react'

const Home: NextPage = () => {
	const params = useRouter().query
	const push = useRouter().push

	useEffect(() => {
		if (params.access_token) {
			nookies.set(null, 'jwt', params.access_token as string, {
				maxAge: 24 * 60 * 60,
				path: '/'
			})
			push('/')
		}
	}, [params])

	return (
		<div className='flex min-h-screen w-full flex-row items-center justify-center py-2'>
			<div className='flex flex-col gap-4 w-1/2 h-screen items-center justify-center bg-slate-50'>
				<h1 className='text-6xl font-bold'>Welcome to ꝑBit</h1>
				<p className='text-lg'>A project for Polygon Buidlit Hackathon.</p>
			</div>
			<div className='flex flex-col w-1/2 h-screen justify-center items-center'>
				<Auth />
			</div>
		</div>
	)
}

export default Home
