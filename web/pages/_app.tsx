import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

import { Layout } from '../context/components/Layout'
import { MetamaskProvider } from 'context/AppContext'

import 'styles/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
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
