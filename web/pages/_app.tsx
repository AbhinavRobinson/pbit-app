import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PageChange from 'components/PageChange/PageChange'
import { useEffect, useState } from 'react'

import { Layout } from 'context/components/Layout'
import { MetamaskProvider } from 'context/AppContext'
import { ToastContainer } from 'react-toastify'

import 'styles/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
	const [pageLoading, setPageLoading] = useState<boolean>(false)
	const Router = useRouter()

	useEffect(() => {
		if (typeof window !== undefined) {
			Router.events.on('routeChangeStart', () => setPageLoading(true))
			Router.events.on('routeChangeComplete', () => setPageLoading(false))
			Router.events.on('routeChangeError', () => setPageLoading(false))
		}
		return () => {
			setPageLoading(false)
		}
	}, [typeof window])

	return pageLoading ? (
		<PageChange path={Router.pathname} />
	) : (
		<>
			<Head>
				<title>dIMS</title>
				<meta name='description' content='' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MetamaskProvider>
				<Layout>
					<Component {...pageProps} />
					<ToastContainer />
				</Layout>
			</MetamaskProvider>
		</>
	)
}

export default MyApp
