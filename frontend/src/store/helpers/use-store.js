import { useContext } from 'react'
import StoreContext from './context'

function useStore () {
  return useContext(StoreContext)
}

export default useStore