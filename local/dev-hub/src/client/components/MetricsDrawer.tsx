import { Dialog } from '@base-ui/react/dialog'
import type {
  TBrowserMetricSample,
  TMetricRange,
  TPublicService,
  TServerMetricSample,
  TServiceMetricsSnapshot,
} from '@shared/contracts'
import { ChartNoAxesCombined, X } from 'lucide-react'
import { lazy, Suspense } from 'react'

import { useMetricHistory } from '@/hooks/useMetricHistory'

import { CurrentMetric } from './CurrentMetric'
import type { TMetricTrendPoint } from './MetricTrendChart'

const MetricTrendChart = lazy(() =>
  import('./MetricTrendChart').then((module) => ({ default: module.MetricTrendChart })),
)

type TProps = {
  service: TPublicService
  current?: TServiceMetricsSnapshot
  onClose: () => void
}

const RANGE_LABELS: Record<TMetricRange, string> = {
  '15m': '15 min',
  '1h': '1 hour',
  '6h': '6 hours',
  '24h': 'Today',
}

const RANGES = Object.keys(RANGE_LABELS) as TMetricRange[]
const MB = 1024 * 1024

export function MetricsDrawer({ service, current, onClose }: TProps) {
  const metricHistory = useMetricHistory(service.id, current)
  const { activeBrowserSamples, activePageId, bucketMs, pageIds, range, serverSamples } =
    metricHistory
  const thresholds = service.metricThresholds

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className='metrics-drawer-backdrop' />
        <Dialog.Viewport className='metrics-drawer-viewport'>
          <Dialog.Popup className='metrics-drawer-popup' data-service-id={service.id}>
            <header className='metrics-drawer-header'>
              <div className='metrics-drawer-title-group'>
                <ChartNoAxesCombined aria-hidden='true' />
                <div>
                  <span className='metrics-drawer-kicker'>Performance history</span>
                  <Dialog.Title>{service.name}</Dialog.Title>
                </div>
              </div>
              <Dialog.Close className='metrics-drawer-close' aria-label='Close metric history'>
                <X aria-hidden='true' />
              </Dialog.Close>
            </header>

            <div className='metrics-drawer-toolbar'>
              <div className='metrics-drawer-tabs' role='tablist' aria-label='Metric time range'>
                {RANGES.map((item) => (
                  <button
                    type='button'
                    role='tab'
                    aria-selected={range === item}
                    className={range === item ? 'is-active' : ''}
                    key={item}
                    onClick={() => metricHistory.setRange(item)}
                  >
                    {RANGE_LABELS[item]}
                  </button>
                ))}
              </div>

              {pageIds.length > 1 ? (
                <label className='metrics-page-select'>
                  <span>Browser page</span>
                  <select
                    value={activePageId || ''}
                    onChange={(event) => metricHistory.setSelectedPageId(event.target.value)}
                  >
                    {pageIds.map((pageId, index) => (
                      <option key={pageId} value={pageId}>
                        Page {index + 1}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>

            <div className={`metrics-current-row metrics-current-row--${service.group}`}>
              {service.group === 'frontend' ? (
                <>
                  <CurrentMetric
                    label='Page heap'
                    value={formatBytes(current?.browser?.heapBytes)}
                    critical={current?.browser?.heapCritical}
                  />
                  <CurrentMetric
                    label='Busy'
                    value={formatPercent(current?.browser?.busyPercent)}
                    critical={current?.browser?.busyCritical}
                  />
                </>
              ) : null}
              <CurrentMetric
                label='Server CPU'
                value={formatPercent(current?.server?.cpuPercent)}
                critical={current?.server?.cpuCritical}
              />
              <CurrentMetric
                label='Server memory'
                value={formatBytes(current?.server?.rssBytes)}
                critical={current?.server?.rssCritical}
              />
            </div>

            <div className='metrics-drawer-content'>
              {metricHistory.loading ? (
                <div className='metrics-drawer-state'>Loading metric history…</div>
              ) : metricHistory.error ? (
                <div className='metrics-drawer-state is-error'>
                  <span>{metricHistory.error}</span>
                  <button type='button' onClick={metricHistory.retry}>
                    Try again
                  </button>
                </div>
              ) : (
                <Suspense fallback={<div className='metrics-drawer-state'>Loading charts…</div>}>
                  <div className='metrics-chart-grid'>
                    {service.group === 'frontend' ? (
                      <>
                        <MetricTrendChart
                          title='Page heap'
                          unit='MB'
                          points={toBrowserPoints(activeBrowserSamples, 'heapBytes', MB)}
                          threshold={thresholds.browserHeapBytes / MB}
                          bucketMs={bucketMs}
                        />
                        <MetricTrendChart
                          title='Main-thread busy'
                          unit='%'
                          points={toBrowserPoints(activeBrowserSamples, 'busyPercent')}
                          threshold={thresholds.browserBusyPercent}
                          bucketMs={bucketMs}
                        />
                      </>
                    ) : null}
                    <MetricTrendChart
                      title='Server CPU'
                      unit='%'
                      points={toServerPoints(serverSamples, 'cpuPercent')}
                      threshold={thresholds.serverCpuPercent}
                      bucketMs={bucketMs}
                    />
                    <MetricTrendChart
                      title='Server memory'
                      unit='MB'
                      points={toServerPoints(serverSamples, 'rssBytes', MB)}
                      threshold={thresholds.serverRssBytes / MB}
                      bucketMs={bucketMs}
                    />
                  </div>
                </Suspense>
              )}
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function toServerPoints(
  samples: TServerMetricSample[],
  key: 'cpuPercent' | 'rssBytes',
  divisor = 1,
): TMetricTrendPoint[] {
  return samples.map((sample) => ({
    at: sample.at,
    value: sample[key] / divisor,
    runKey: sample.runId,
  }))
}

function toBrowserPoints(
  samples: TBrowserMetricSample[],
  key: 'heapBytes' | 'busyPercent',
  divisor = 1,
): TMetricTrendPoint[] {
  return samples.map((sample) => ({
    at: sample.at,
    value: sample[key] === null ? null : sample[key] / divisor,
    runKey: sample.pageId,
  }))
}

function formatBytes(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return value >= 1024 ** 3
    ? `${(value / 1024 ** 3).toFixed(1)} GB`
    : `${Math.round(value / MB)} MB`
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return `${value < 10 ? value.toFixed(1) : Math.round(value)}%`
}
