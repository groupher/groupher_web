import type {
  TBrowserMetricSample,
  TMetricHistoryPayload,
  TMetricRange,
  TServerMetricSample,
  TServiceMetricsSnapshot,
} from '@shared/contracts'
import { useEffect, useMemo, useState } from 'react'

import { fetchMetricHistory } from '@/lib/hub-client'

export function useMetricHistory(serviceId: string, current: TServiceMetricsSnapshot | undefined) {
  const [range, setRange] = useState<TMetricRange>('1h')
  const [history, setHistory] = useState<TMetricHistoryPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    void fetchMetricHistory(serviceId, range, controller.signal)
      .then(setHistory)
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : 'Could not load metric history.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [range, requestVersion, serviceId])

  const serverSamples = useMemo(() => history?.samples.filter(isServerSample) || [], [history])
  const browserSamples = useMemo(() => history?.samples.filter(isBrowserSample) || [], [history])
  const pageIds = useMemo(
    () => Array.from(new Set(browserSamples.map((sample) => sample.pageId))),
    [browserSamples],
  )
  const activePageId =
    (selectedPageId && pageIds.includes(selectedPageId) ? selectedPageId : null) ||
    (current?.browser && pageIds.includes(current.browser.pageId)
      ? current.browser.pageId
      : null) ||
    pageIds[0] ||
    null

  return {
    range,
    setRange,
    loading,
    error,
    retry: () => setRequestVersion((value) => value + 1),
    pageIds,
    activePageId,
    setSelectedPageId,
    serverSamples,
    activeBrowserSamples: activePageId
      ? browserSamples.filter((sample) => sample.pageId === activePageId)
      : [],
    bucketMs: history?.bucketMs || 1_000,
  }
}

function isServerSample(
  sample: TMetricHistoryPayload['samples'][number],
): sample is TServerMetricSample {
  return sample.source === 'server'
}

function isBrowserSample(
  sample: TMetricHistoryPayload['samples'][number],
): sample is TBrowserMetricSample {
  return sample.source === 'browser'
}
