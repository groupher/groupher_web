import type { TPublicService } from '@shared/contracts'

export const DISCONNECTED_SERVICE_REASON =
  'Dev Hub is disconnected. Live service status is unavailable.'

/** Identifies the client-only projection used while live Hub state is unreachable. */
export const isServiceDisconnected = (service: TPublicService): boolean =>
  service.unavailableReason === DISCONNECTED_SERVICE_REASON

/** Disables stale controls while preserving the last runtime status and card layout. */
export const projectDisconnectedServices = (
  services: readonly TPublicService[],
): TPublicService[] =>
  services.map((service) => ({
    ...service,
    pid: null,
    startedAt: null,
    externalProcess: null,
    canStart: false,
    unavailableReason: DISCONNECTED_SERVICE_REASON,
  }))
