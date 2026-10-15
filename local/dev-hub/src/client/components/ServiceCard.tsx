import type { TPublicService, TServiceMetricsSnapshot, TServiceStartMode } from '@shared/contracts'
import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig } from 'motion/react'

import { SERVICE_DEPLOYMENT_TARGETS } from '@/lib/infra-links'
import {
  getServiceDisplayStatus,
  isServiceDisconnected,
  type TServiceDisplayStatus,
} from '@/lib/service-connection-state'
import { getServiceOpenUrl } from '@/lib/service-open-url'

import { ServiceCardHeader } from './ServiceCardHeader'
import { ServiceMetricsStrip } from './ServiceMetricsStrip'
import { ServiceProcessActions } from './ServiceProcessActions'
import { ServiceTerminalActions } from './ServiceTerminalActions'
import { TerminalSurface } from './TerminalSurface'

type TProps = {
  service: TPublicService
  metrics?: TServiceMetricsSnapshot
  expanded: boolean
  compact?: boolean
  pending: boolean
  hasRequiredDependencyIssue: boolean
  hasStartedRequiredDependencies: boolean
  hasOptionalDependencyIssue: boolean
  onToggleService: (service: TPublicService) => void
  onStartService: (service: TPublicService, mode: TServiceStartMode | 'default') => void
  onRestartService: (service: TPublicService) => void
  onToggleTerminal: (id: string) => void
  onOpenMetrics: (id: string) => void
  onOpenConfig: (id: string) => void
  onOpenDependencies: (id: string) => void
  onOpenExternal: (id: string) => void
}

const CARD_SPRING = {
  type: 'spring',
  duration: 0.3,
  bounce: 0,
} as const

export function ServiceCard({
  service,
  metrics,
  expanded,
  compact: compactOverride = false,
  pending,
  hasRequiredDependencyIssue,
  hasStartedRequiredDependencies,
  hasOptionalDependencyIssue,
  onToggleService,
  onStartService,
  onRestartService,
  onToggleTerminal,
  onOpenMetrics,
  onOpenConfig,
  onOpenDependencies,
  onOpenExternal,
}: TProps) {
  const state = getServiceCardState(service, metrics, pending, compactOverride)
  const {
    displayStatus,
    active,
    stoppable,
    disabled,
    restartDisabled,
    emptyText,
    compact,
    hasDependencies,
    actionLabel,
    openUrl,
    showAddress,
    deploymentTarget,
    externalDetailsAvailable,
  } = state

  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion features={domAnimation}>
        <article className='service-card' data-service-id={service.id}>
          <div className={`service-visual ${compact ? 'is-compact' : ''}`}>
            <ServiceCardHeader
              service={service}
              displayStatus={displayStatus}
              compact={compact}
              pending={pending}
              disabled={disabled}
              hasDependencies={hasDependencies}
              showAddress={showAddress}
              externalDetailsAvailable={externalDetailsAvailable}
              deploymentTarget={deploymentTarget}
              openUrl={openUrl}
              onStartService={onStartService}
              onOpenExternal={onOpenExternal}
            />

            <AnimatePresence initial={false}>
              {!compact ? (
                <m.div
                  key='service-preview'
                  className='service-preview-reveal'
                  initial={{ height: 0, opacity: 0, y: -6 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -4 }}
                  transition={CARD_SPRING}
                >
                  <div className='terminal-preview-frame'>
                    <div className='terminal-preview-logs'>
                      <TerminalSurface
                        serviceId={service.id}
                        mode='preview'
                        emptyText={emptyText}
                      />
                    </div>
                    <ServiceMetricsStrip
                      service={service}
                      metrics={metrics}
                      onOpen={() => onOpenMetrics(service.id)}
                    />
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>

          <AnimatePresence initial={false}>
            {!compact ? (
              <m.div
                key='service-actions'
                className='service-actions-reveal'
                initial={{ height: 0, opacity: 0, y: -4 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -3 }}
                transition={CARD_SPRING}
              >
                <footer className='service-actions'>
                  <ServiceTerminalActions
                    service={service}
                    expanded={expanded}
                    pending={pending}
                    restartDisabled={restartDisabled}
                    hasDependencies={hasDependencies}
                    hasRequiredDependencyIssue={hasRequiredDependencyIssue}
                    hasStartedRequiredDependencies={hasStartedRequiredDependencies}
                    hasOptionalDependencyIssue={hasOptionalDependencyIssue}
                    onToggleTerminal={onToggleTerminal}
                    onRestartService={onRestartService}
                    onOpenConfig={onOpenConfig}
                    onOpenDependencies={onOpenDependencies}
                  />
                  <ServiceProcessActions
                    service={service}
                    active={active}
                    pending={pending}
                    stoppable={stoppable}
                    disabled={disabled}
                    restartDisabled={restartDisabled}
                    hasDependencies={hasDependencies}
                    actionLabel={actionLabel}
                    onToggleService={onToggleService}
                    onStartService={onStartService}
                    onRestartService={onRestartService}
                  />
                </footer>
              </m.div>
            ) : null}
          </AnimatePresence>
        </article>
      </LazyMotion>
    </MotionConfig>
  )
}

function getServiceCardState(
  service: TPublicService,
  metrics: TServiceMetricsSnapshot | undefined,
  pending: boolean,
  compactOverride: boolean,
) {
  const disconnected = isServiceDisconnected(service)
  const stoppable = ['starting', 'running'].includes(service.status)
  const disabled =
    disconnected ||
    pending ||
    service.status === 'stopping' ||
    !service.canStart ||
    service.status === 'external'

  return {
    displayStatus: (!disconnected &&
    pending &&
    (service.status === 'stopped' || service.status === 'unavailable')
      ? 'starting'
      : getServiceDisplayStatus(service)) as TServiceDisplayStatus,
    active:
      !disconnected && (pending || ['starting', 'running', 'stopping'].includes(service.status)),
    stoppable,
    disabled,
    restartDisabled: disabled,
    emptyText:
      pending && (service.status === 'stopped' || service.status === 'unavailable')
        ? `${service.name} is starting.`
        : service.unavailableReason || `${service.name} is ${service.status}.`,
    compact:
      compactOverride ||
      (!pending && (service.status === 'stopped' || service.status === 'unavailable')),
    hasDependencies:
      service.startPolicy.requiredDependencies.length +
        service.startPolicy.optionalDependencies.length >
      0,
    actionLabel:
      service.status === 'stopping'
        ? 'Stopping'
        : stoppable
          ? 'Stop'
          : service.status === 'external'
            ? 'External'
            : 'Start',
    openUrl: getServiceOpenUrl(service, metrics),
    showAddress: !disconnected && (service.status === 'running' || Boolean(metrics?.browser?.url)),
    deploymentTarget: SERVICE_DEPLOYMENT_TARGETS[service.id],
    externalDetailsAvailable:
      !disconnected && service.status === 'external' && Boolean(service.externalProcess),
  }
}
