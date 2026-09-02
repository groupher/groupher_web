'use client'

import { createContext } from 'react'

import type { TMetric } from '~/spec'

export const MetricContext = createContext<TMetric | null>(null)
MetricContext.displayName = 'Metric'
