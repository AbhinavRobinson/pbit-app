import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { getContract } from '../config/ContractInstance'
import { useWeb3 } from '../hooks/useWeb3'
import styles from '../styles/Home.module.css'
import { ERC721 } from '../types'

const Home: NextPage = () => {
	const { connectedAddress, chainId, incorrectChainId } = useWeb3()

	useEffect(() => {
		if (connectedAddress && chainId && !incorrectChainId) {
			// do stuff here - example code. address not set.
			const run = async () => {
				const ERC721 = await getContract<ERC721>('ERC721')
			}
		}
	}, [connectedAddress, chainId, incorrectChainId])

	return (
		<div className={styles.container}>
			<Head>
				<title>Ethers NextJS</title>
				<meta name='description' content='' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<button>This is a button</button>
		</div>
	)
}

export default Home
