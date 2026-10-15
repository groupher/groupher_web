import type { TPublicService, TServiceStartMode } from '@shared/contracts'
import { startTransition, useCallback, useEffect, useState } from 'react'

import { useServiceHub } from '@/hooks/useServiceHub'
import type { THubDrawer, THubViewMode } from '@/spec'

const getInitialViewMode = (): THubViewMode =>
  new URLSearchParams(window.location.search).get('view') === 'flow' ? 'flow' : 'list'

export function useAppController() {
  const hub = useServiceHub()
  const [expandedIds, setExpandedIds] = useState(() => new Set<string>())
  const [activeDrawer, setActiveDrawer] = useState<THubDrawer>(null)
  const [viewMode, setViewMode] = useState<THubViewMode>(getInitialViewMode)

  useEffect(() => {
    const compactIds = new Set(
      hub.services
        .filter((service) => service.status === 'stopped' || service.status === 'unavailable')
        .map((service) => service.id),
    )

    setExpandedIds((current) => {
      const next = new Set(current)
      for (const id of compactIds) next.delete(id)
      return next.size === current.size ? current : next
    })
  }, [hub.services])

  const toggleTerminal = useCallback((id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])
  const toggleService = useCallback(
    (service: TPublicService) => void hub.toggleService(service),
    [hub.toggleService],
  )
  const restartService = useCallback(
    (service: TPublicService) => void hub.restartService(service),
    [hub.restartService],
  )
  const startService = useCallback(
    (service: TPublicService, mode: TServiceStartMode | 'default') =>
      void hub.startService(service, mode),
    [hub.startService],
  )
  const openDrawer = useCallback(
    (kind: 'metrics' | 'config' | 'dependencies' | 'external', serviceId: string) =>
      setActiveDrawer({ kind, serviceId }),
    [],
  )
  const stopExternal = useCallback(
    (service: TPublicService) => void hub.stopService(service),
    [hub.stopService],
  )
  const closeDrawer = useCallback(() => setActiveDrawer(null), [])
  const changeViewMode = useCallback((mode: THubViewMode) => {
    const url = new URL(window.location.href)
    if (mode === 'flow') url.searchParams.set('view', 'flow')
    else url.searchParams.delete('view')
    window.history.replaceState(null, '', url)
    startTransition(() => setViewMode(mode))
  }, [])

  const findDrawerService = (kind: 'metrics' | 'config' | 'dependencies' | 'external') =>
    activeDrawer?.kind === kind
      ? hub.services.find((service) => service.id === activeDrawer.serviceId) || null
      : null

  return {
    ...hub,
    expandedIds,
    activeDrawer,
    viewMode,
    metricsService: findDrawerService('metrics'),
    configService: findDrawerService('config'),
    dependencyService: findDrawerService('dependencies'),
    externalService: findDrawerService('external'),
    diffScope: activeDrawer?.kind === 'git' ? activeDrawer.scope : null,
    setActiveDrawer,
    toggleTerminal,
    handleToggleService: toggleService,
    handleRestartService: restartService,
    handleStartService: startService,
    openMetrics: (id: string) => openDrawer('metrics', id),
    openConfig: (id: string) => openDrawer('config', id),
    openDependencies: (id: string) => openDrawer('dependencies', id),
    openExternal: (id: string) => openDrawer('external', id),
    handleStopExternal: stopExternal,
    closeDrawer,
    handleViewModeChange: changeViewMode,
  }
}
