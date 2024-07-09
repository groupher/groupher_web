'use client'

import { type FC, type ReactNode, memo } from 'react'
import { Provider } from 'mobx-react'
import { Suspense } from 'react'

import { useStore } from '~/stores/init'

type TProps = {
  children: ReactNode
}

const RootStoreWrapper: FC<TProps> = ({ children }) => {
  const store = useStore()

  return (
    <Provider store={store}>
      <Suspense fallback={null}>{children}</Suspense>
    </Provider>
  )
}

export default memo(RootStoreWrapper)
