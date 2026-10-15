import type { TPublicService, TServiceMetricsSnapshot } from '@shared/contracts'
import { ChevronRight } from 'lucide-react'

import { BrowserMetrics } from './BrowserMetrics'
import { ServerMetrics } from './ServerMetrics'

type TProps = {
  service: TPublicService
  metrics?: TServiceMetricsSnapshot
  onOpen: () => void
}

export function ServiceMetricsStrip({ service, metrics, onOpen }: TProps) {
  const server = metrics?.server
  const browser = metrics?.browser
  const isFrontend = service.group === 'frontend'

  return (
    <div className='service-metrics-strip'>
      <div className='service-metrics-values'>
        {isFrontend ? <BrowserMetrics browser={browser} /> : null}
        <ServerMetrics server={server} label={isFrontend ? 'Server' : 'CPU'} />
      </div>

      <button
        type='button'
        className='service-metrics-more'
        onClick={onOpen}
        aria-label={`Open ${service.name} metric history`}
      >
        <ChevronRight aria-hidden='true' />
      </button>
    </div>
  )
}
