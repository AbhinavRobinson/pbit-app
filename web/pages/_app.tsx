import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from 'next-themes'
import { store, StoreContext } from '../contexts/store'
import { UserProvider } from '../contexts/user'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<StoreContext.Provider value={store}>
			<QueryClientProvider client={queryClient}>
				<UserProvider>
					<ThemeProvider attribute='class' defaultTheme='light'>
						<Component {...pageProps} />
					</ThemeProvider>
				</UserProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</StoreContext.Provider>
	)
}

export default MyApp
