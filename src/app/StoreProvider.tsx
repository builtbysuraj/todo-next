'use client'

import store from '@/lib/store'
import { Provider } from 'react-redux'

type StoreProviderProps = {
  children: React.ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>
}
