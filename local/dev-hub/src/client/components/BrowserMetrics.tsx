import type { TServiceMetricsSnapshot } from '@shared/contracts'

import { formatMetricBytes, formatMetricPercent } from './metric-format'

type TProps = {
  browser?: TServiceMetricsSnapshot['browser']
}

export function BrowserMetrics({ browser }: TProps) {
  return (
    <span className='metric-cluster' title={browser?.url || 'No browser page is reporting'}>
      <span className='metric-label'>Page</span>
      {browser ? (
        <>
          <strong className={browser.heapCritical ? 'is-critical' : ''}>
            {formatMetricBytes(browser.heapBytes)}
          </strong>
          <span className='metric-separator'>·</span>
          <strong className={browser.busyCritical ? 'is-critical' : ''}>
            {formatMetricPercent(browser.busyPercent)}
          </strong>
          <span className='metric-suffix'>busy</span>
        </>
      ) : (
        <span className='metric-empty'>not open</span>
      )}
    </span>
  )
}
