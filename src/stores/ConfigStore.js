import React from 'react'
import { createGameStore } from './GameStore'
import { useLocalStore } from 'mobx-react-lite'

const storeContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createGameStore)
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}