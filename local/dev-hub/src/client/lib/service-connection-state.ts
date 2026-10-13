import type { TPublicService } from '@shared/contracts'

export const DISCONNECTED_SERVICE_REASON =
  'Dev Hub is disconnected. Live service status is unavailable.'

export const projectDisconnectedServices = (
  services: readonly TPublicService[],
): TPublicService[] =>
  services.map((service) => ({
    ...service,
    status: 'unavailable',
    pid: null,
    startedAt: null,
    externalProcess: null,
    canStart: false,
    unavailableReason: DISCONNECTED_SERVICE_REASON,
  }))
