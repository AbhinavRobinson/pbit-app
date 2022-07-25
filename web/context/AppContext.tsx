import { ethers } from 'ethers'
import { Context, useState } from 'react'
import { ContractInstance } from '../config/ContractInstance'
import { networks, defaultNetwork } from '../config/config'
import { toast } from 'react-toastify'

import { createContext, Dispatch, SetStateAction } from 'react'

interface IMetamaskContext {
	chainId: string
	connectedAddress: string
	loader: boolean
	wallet: boolean
	incorrectChainId: boolean
	setChainId: Dispatch<SetStateAction<string>>
	setConnectedAddress: Dispatch<SetStateAction<string>>
	setLoader: Dispatch<SetStateAction<boolean>>
	showWallet: Dispatch<SetStateAction<boolean>>
	setIncorrectChainId: Dispatch<SetStateAction<boolean>>
	getProvider: () => {}
	connect: () => {}
	initialConnection: () => {}
	handleTransactionError: any
}

export const MetamaskContext: Context<IMetamaskContext> =
	createContext<IMetamaskContext>({
		chainId: defaultNetwork.id,
		connectedAddress: '',
		loader: false,
		wallet: false,
		incorrectChainId: false,
		setChainId: () => {},
		setConnectedAddress: () => {},
		setLoader: () => {},
		showWallet: () => {},
		setIncorrectChainId: () => {},
		getProvider: async () => {},
		connect: async () => {},
		initialConnection: async () => {},
		handleTransactionError: (error: any) => {},
	})

export const MetamaskProvider = ({ children }: any) => {
	const [connectedAddress, setConnectedAddress] = useState<string>('')
	const [wallet, showWallet] = useState<boolean>(false)
	const [chainId, setChainId] = useState<string>(defaultNetwork.id)
	const [incorrectChainId, setIncorrectChainId] = useState<boolean>(false)
	const [loader, setLoader] = useState<boolean>(false)

	const getProvider = async (
		_throwErr: boolean = false
	): Promise<ethers.providers.Web3Provider> => {
		if (ContractInstance.provider) {
			if (!connectedAddress) {
				const walletAddress = await ContractInstance.provider
					.getSigner()
					.getAddress()
				setConnectedAddress(walletAddress)
			}
			return ContractInstance.provider
		} else return ContractInstance.provider
	}

	const connect = async () => {
		const ethereum = (window as any)?.ethereum
		if (ethereum) {
			await ethereum.request({
				method: 'eth_requestAccounts',
			})
			ContractInstance.provider = new ethers.providers.Web3Provider(
				ethereum
			)

			const { chainId } = await ContractInstance.provider.getNetwork()

			if (Object.keys(networks).includes(chainId.toString())) {
				ContractInstance.chainId = chainId as keyof typeof networks
				await ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: defaultNetwork.hx,
							rpcUrls: [defaultNetwork.rpcUrl],
							chainName: defaultNetwork.name,
							blockExplorerUrls: [
								defaultNetwork.blockExplorerUrl,
							],
							nativeCurrency: {
								name: defaultNetwork.nativeCurrency.name,
								symbol: defaultNetwork.nativeCurrency.symbol,
								decimals:
									defaultNetwork.nativeCurrency.decimals,
							},
						},
					],
				})
				await ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: defaultNetwork.hx }], // chainId must be in hexadecimal numbers
				})
			} else {
				setChainId(chainId)
				setIncorrectChainId(true)
			}

			setLoader(false)
			return getProvider()
		}
	}

	const initialConnection = async () => {
		const ethereum = (window as any)?.ethereum
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum)
			const accounts = await provider.listAccounts()

			ethereum.on('chainChanged', async (chainId: any) => {
				const parsedChainId = parseInt(chainId).toString()
				setChainId(parsedChainId)
				const isConnectedToAllowedChain =
					Object.keys(networks).includes(parsedChainId)
				if (!isConnectedToAllowedChain) {
					setIncorrectChainId(true)
				} else {
					setIncorrectChainId(false)
				}
			})

			ethereum.on('accountsChanged', async (accounts: any) => {
				setConnectedAddress(accounts[0] || '')
			})

			if (accounts.length > 0) {
				connect()
			}
		}
	}

	const handleTransactionError = (error: any) => {
		if (error.__proto__.name === 'Error') {
			const start = error.message.indexOf('{')
			const end = error.message.indexOf('}')
			if (start && end) {
				error = JSON.parse(error.message.substring(start, end + 1))
			}
		}
		if (error.code === -32002) {
			return toast.error('Please unlock your Metamask wallet.')
		} else if (error.code === 4001) {
			return toast.error('User denied Metamask signature')
		} else if (error.code === -32603 || error.code === 3) {
			// transfer amount exceeds balance
			const message: string = error.data.message || error.message
			// if (message.includes('transfer amount exceeds balance'))
			// 	return toast.error("You don't have enough balance")
			// else if (message.includes('NFT is not up for sale'))
			// 	return toast.error('NFT is not up for sale')
			// else if (message.includes('Unrecognized chain ID'))
			// 	return toast.error('Please add BSC to your wallet')
			return toast.error(message)
		} else {
			return toast.error(error?.message)
		}
	}

	const value = {
		chainId,
		connectedAddress,
		loader,
		wallet,
		incorrectChainId,
		setChainId,
		setConnectedAddress,
		setLoader,
		showWallet,
		setIncorrectChainId,
		getProvider,
		connect,
		initialConnection,
		handleTransactionError,
	}

	return (
		<MetamaskContext.Provider value={value}>
			{children}
		</MetamaskContext.Provider>
	)
}
