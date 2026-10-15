import type { TPublicService, TServiceStartMode } from '@shared/contracts'

import type { TServiceDeploymentTarget } from '@/lib/infra-links'
import { openPlatformUrl } from '@/lib/open-platform-url'
import type { TServiceDisplayStatus } from '@/lib/service-connection-state'

import { ServiceStackMark } from './ServiceStackMark'
import { ServiceStatusGroup } from './ServiceStatusGroup'

type TProps = {
  service: TPublicService
  displayStatus: TServiceDisplayStatus
  compact: boolean
  pending: boolean
  disabled: boolean
  hasDependencies: boolean
  showAddress: boolean
  externalDetailsAvailable: boolean
  deploymentTarget?: TServiceDeploymentTarget
  openUrl?: string
  onStartService: (service: TPublicService, mode: TServiceStartMode | 'default') => void
  onOpenExternal: (id: string) => void
}

export function ServiceCardHeader({
  service,
  displayStatus,
  compact,
  pending,
  disabled,
  hasDependencies,
  showAddress,
  externalDetailsAvailable,
  deploymentTarget,
  openUrl,
  onStartService,
  onOpenExternal,
}: TProps) {
  return (
    <header className='service-meta'>
      <ServiceStackMark
        name={service.name}
        monogram={service.monogram}
        technologies={service.technologies}
      />
      <span className='service-copy'>
        <span className='service-title-row'>
          <span className='service-name'>{service.name}</span>
          {deploymentTarget ? (
            <a
              className={`service-deployment-link service-deployment-link--${deploymentTarget.platformId}`}
              href={deploymentTarget.url}
              target='_blank'
              rel='noreferrer'
              aria-label={`Open ${service.name} deployment on ${deploymentTarget.platformName}`}
              title={deploymentTarget.platformName}
              onClick={(event) => {
                event.preventDefault()
                openPlatformUrl(event.currentTarget.href)
              }}
            >
              <svg
                className={`service-deployment-mark service-deployment-mark--${deploymentTarget.platformId}`}
                viewBox={deploymentTarget.icon.viewBox}
                aria-hidden='true'
              >
                <path d={deploymentTarget.icon.path} fill={deploymentTarget.icon.color} />
              </svg>
            </a>
          ) : null}
        </span>
        <span className='service-description'>{service.description}</span>
      </span>
      <ServiceStatusGroup
        service={service}
        displayStatus={displayStatus}
        compact={compact}
        pending={pending}
        disabled={disabled}
        hasDependencies={hasDependencies}
        showAddress={showAddress}
        externalDetailsAvailable={externalDetailsAvailable}
        openUrl={openUrl}
        onStartService={onStartService}
        onOpenExternal={onOpenExternal}
      />
    </header>
  )
}
