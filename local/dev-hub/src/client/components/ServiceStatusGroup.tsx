import type { TPublicService, TServiceStartMode } from '@shared/contracts'

import type { TServiceDisplayStatus } from '@/lib/service-connection-state'

import { ServiceAddress } from './ServiceAddress'
import { ServiceInlineStart } from './ServiceInlineStart'
import { ServiceStatusLabel } from './ServiceStatusLabel'

type TProps = {
  service: TPublicService
  displayStatus: TServiceDisplayStatus
  compact: boolean
  pending: boolean
  disabled: boolean
  hasDependencies: boolean
  showAddress: boolean
  externalDetailsAvailable: boolean
  openUrl?: string
  onStartService: (service: TPublicService, mode: TServiceStartMode | 'default') => void
  onOpenExternal: (id: string) => void
}

export function ServiceStatusGroup(props: TProps) {
  const { service } = props
  return (
    <div
      className={`service-status-group ${props.showAddress ? 'has-address' : ''} ${props.compact ? 'is-compact' : ''}`}
    >
      {!props.compact || !service.canStart ? (
        <ServiceStatusLabel
          service={service}
          displayStatus={props.displayStatus}
          externalDetailsAvailable={props.externalDetailsAvailable}
          onOpenExternal={props.onOpenExternal}
        />
      ) : null}
      {props.compact && service.canStart ? (
        <ServiceInlineStart
          service={service}
          pending={props.pending}
          disabled={props.disabled}
          hasDependencies={props.hasDependencies}
          onStart={props.onStartService}
        />
      ) : null}
      {props.showAddress ? <ServiceAddress service={service} openUrl={props.openUrl} /> : null}
    </div>
  )
}
