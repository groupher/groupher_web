'use client'

import type { ReactNode } from 'react'

import type { TMetric } from '~/spec'

import { MetricContext } from './context'

type TProps = {
  children: ReactNode
  value: TMetric
}

export default function MetricProvider({ children, value }: TProps) {
  return <MetricContext.Provider value={value}>{children}</MetricContext.Provider>
}
