import type { TServiceMetricsSnapshot } from '@shared/contracts'

import { formatMetricBytes, formatMetricPercent } from './metric-format'

type TProps = {
  server?: TServiceMetricsSnapshot['server']
  label: string
}

export function ServerMetrics({ server, label }: TProps) {
  return (
    <span className='metric-cluster'>
      <span className='metric-label'>{label}</span>
      {server ? (
        <>
          <strong className={server.cpuCritical ? 'is-critical' : ''}>
            {formatMetricPercent(server.cpuPercent)}
          </strong>
          <span className='metric-separator'>·</span>
          <span className='metric-suffix'>Mem</span>
          <strong className={server.rssCritical ? 'is-critical' : ''}>
            {formatMetricBytes(server.rssBytes)}
          </strong>
        </>
      ) : (
        <span className='metric-empty'>—</span>
      )}
    </span>
  )
}
