export const networks = {
	137: {
		ERC721: '',
		Executor: '',
		Invoice: '',
	},
	80001: {
		ERC721: '',
		Executor: '0xD7D7afECd9FC484F4145C90e4562A671d013aF92',
		Invoice: '0x440a4cff94CE6a785ec9e5E477Cd74D870609bBa',
	},
}

export const defaultNetwork = {
	id: '80001',
	hx: '0x13881',
	name: 'Mumbai Testnet',
	nativeCurrency: {
		name: 'Polygon Testnet Mumbai',
		symbol: 'MATIC',
		decimals: 18,
	},
	blockExplorerUrl: 'https://mumbai.polygonscan.com',
	rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
}
