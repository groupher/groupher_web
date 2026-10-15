export function formatMetricBytes(value: number | null): string {
  if (value === null) return '—'
  if (value >= 1024 ** 3) return `${(value / 1024 ** 3).toFixed(1)} GB`
  return `${Math.round(value / 1024 ** 2)} MB`
}

export function formatMetricPercent(value: number | null): string {
  if (value === null) return '—'
  return `${value < 10 ? value.toFixed(1) : Math.round(value)}%`
}
