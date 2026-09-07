'use client'

import { use } from 'react'

import { MetricContext } from './context'

/** Reads the product surface metric from its provider. */
export default function useMetricContext() {
  const metric = use(MetricContext)
  if (!metric) throw new Error('useMetric must be used within a MetricProvider')
  return metric
}
