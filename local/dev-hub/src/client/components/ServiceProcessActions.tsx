import type { TPublicService, TServiceStartMode } from '@shared/contracts'
import { LoaderCircle, Play, RotateCw } from 'lucide-react'

import { ServiceActionButton } from './ServiceActionButton'
import { ServiceStartMenu } from './ServiceStartMenu'
import { Uptime } from './Uptime'

type TProps = {
  service: TPublicService
  active: boolean
  pending: boolean
  stoppable: boolean
  disabled: boolean
  restartDisabled: boolean
  hasDependencies: boolean
  actionLabel: string
  onToggleService: (service: TPublicService) => void
  onStartService: (service: TPublicService, mode: TServiceStartMode | 'default') => void
  onRestartService: (service: TPublicService) => void
}

export function ServiceProcessActions(props: TProps) {
  const { service } = props
  const transitioning =
    props.pending || service.status === 'starting' || service.status === 'stopping'
  return (
    <div className={`service-action service-action--process ${props.active ? 'is-active' : ''}`}>
      <ServiceActionButton
        type='button'
        className='service-process-action service-process-action--danger'
        disabled={props.disabled}
        onClick={() =>
          props.stoppable
            ? props.onToggleService(service)
            : props.onStartService(service, 'default')
        }
        aria-label={`${props.actionLabel} ${service.name}`}
        tooltip={props.actionLabel}
      >
        {transitioning ? (
          <LoaderCircle className='spin' aria-hidden='true' />
        ) : props.stoppable ? (
          <span className='service-stop-mark' aria-hidden='true'>
            <span />
          </span>
        ) : (
          <Play className='play-icon' aria-hidden='true' />
        )}
      </ServiceActionButton>
      {!props.stoppable && props.hasDependencies ? (
        <ServiceStartMenu
          service={service}
          disabled={props.disabled}
          variant='icon'
          onStart={props.onStartService}
        />
      ) : null}
      <ServiceActionButton
        type='button'
        className='service-process-action service-process-action--danger'
        disabled={props.restartDisabled}
        onClick={props.restartDisabled ? undefined : () => props.onRestartService(service)}
        aria-label={`Restart ${service.name}`}
        tooltip='Restart service'
      >
        {props.pending ? (
          <LoaderCircle className='spin' aria-hidden='true' />
        ) : (
          <RotateCw aria-hidden='true' />
        )}
      </ServiceActionButton>
      {service.startedAt && props.active ? <Uptime startedAt={service.startedAt} /> : null}
    </div>
  )
}
