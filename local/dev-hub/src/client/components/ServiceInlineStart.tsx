import type { TPublicService, TServiceStartMode } from '@shared/contracts'
import { LoaderCircle, Play } from 'lucide-react'

import { ServiceStartMenu } from './ServiceStartMenu'

type TProps = {
  service: TPublicService
  pending: boolean
  disabled: boolean
  hasDependencies: boolean
  onStart: (service: TPublicService, mode: TServiceStartMode | 'default') => void
}

export function ServiceInlineStart({
  service,
  pending,
  disabled,
  hasDependencies,
  onStart,
}: TProps) {
  return (
    <span className='service-inline-start-wrap'>
      {hasDependencies ? (
        <ServiceStartMenu
          service={service}
          disabled={disabled}
          variant='inline'
          pending={pending}
          onStart={onStart}
        />
      ) : (
        <button
          type='button'
          className='service-inline-start'
          disabled={disabled}
          onClick={() => onStart(service, 'default')}
          aria-label={`${pending ? 'Starting' : 'Start'} ${service.name}`}
        >
          {pending ? (
            <LoaderCircle className='spin' aria-hidden='true' />
          ) : (
            <Play className='play-icon' aria-hidden='true' />
          )}
          <span>Start</span>
        </button>
      )}
    </span>
  )
}
