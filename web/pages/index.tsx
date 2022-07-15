import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { getContract } from '../config/ContractInstance'
import { useWeb3 } from '../hooks/useWeb3'
import styles from '../styles/Home.module.css'
import { ERC721 } from '../types'

const Home: NextPage = () => {
	const { connect, connectedAddress, chainId, incorrectChainId } = useWeb3()

	useEffect(() => {
		if (connectedAddress && chainId && !incorrectChainId) {
			// do stuff here - example code. address not set.
			const run = async () => {
				try {
					await getContract<ERC721>('ERC721')
				} catch (err) {
					console.error(err)
				}
			}
			run()
		}
	}, [connectedAddress, chainId, incorrectChainId])

	return (
		<div className={styles.container}>
			<Head>
				<title>Ethers NextJS</title>
				<meta name='description' content='' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{!connectedAddress && (
				<>
					<button
						onClick={async () => {
							const provider = await connect()
							;(window as any).provider = provider
						}}
					>
						Connect
					</button>
				</>
			)}
			{connectedAddress && incorrectChainId && (
				<>
					<div className={styles.incorrectChain}>
						Please switch to correct network
					</div>
				</>
			)}
			{connectedAddress && <>Connected to {connectedAddress}</>}
		</div>
	)
}

export default Home
