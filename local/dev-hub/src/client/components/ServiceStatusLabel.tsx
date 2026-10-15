import type { TPublicService } from '@shared/contracts'

import type { TServiceDisplayStatus } from '@/lib/service-connection-state'

type TProps = {
  service: TPublicService
  displayStatus: TServiceDisplayStatus
  externalDetailsAvailable: boolean
  onOpenExternal: (id: string) => void
}

const STATUS_LABEL: Record<TServiceDisplayStatus, string> = {
  disconnected: 'Disconnected',
  stopped: 'Stopped',
  starting: 'Starting',
  running: 'Running',
  stopping: 'Stopping',
  external: 'External',
  error: 'Exited',
  unavailable: 'Planned',
}

export function ServiceStatusLabel({
  service,
  displayStatus,
  externalDetailsAvailable,
  onOpenExternal,
}: TProps) {
  if (externalDetailsAvailable)
    return (
      <button
        type='button'
        className={`service-status-label service-status-label--${displayStatus}`}
        aria-label={`Inspect the external process for ${service.name}`}
        aria-haspopup='dialog'
        onClick={() => onOpenExternal(service.id)}
      >
        <span className={`status-dot status-dot--${displayStatus}`} aria-hidden='true' />
        {STATUS_LABEL[displayStatus]}
      </button>
    )
  return (
    <span
      className={`service-status-label service-status-label--${displayStatus}`}
      aria-label={`${service.name} is ${STATUS_LABEL[displayStatus]}`}
    >
      <span className={`status-dot status-dot--${displayStatus}`} aria-hidden='true'>
        {displayStatus === 'running' ? (
          <>
            <span className='status-dot-ping' />
            <span className='status-dot-core' />
          </>
        ) : null}
      </span>
      {STATUS_LABEL[displayStatus]}
    </span>
  )
}
