'use client'

import type { ReactNode } from 'react'

import type { TParseDashboard } from '~/spec'

import { DsbConfigContext } from './context'

type TProps = {
  children: ReactNode
  initData: TParseDashboard
}

export default function DsbConfigProvider({ children, initData }: TProps) {
  return <DsbConfigContext.Provider value={initData}>{children}</DsbConfigContext.Provider>
}
