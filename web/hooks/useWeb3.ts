import { useContext } from 'react'
import { MetamaskContext } from 'context/AppContext'

export const useWeb3 = () => useContext(MetamaskContext)
