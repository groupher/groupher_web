import type { TServiceConfigContent, TServiceConfigManifest } from '@shared/contracts'
import { useCallback, useEffect, useState } from 'react'

import { fetchServiceConfig, fetchServiceConfigContent } from '@/lib/hub-client'

export function useServiceConfig(serviceId: string) {
  const [manifest, setManifest] = useState<TServiceConfigManifest | null>(null)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [revealedFileIds, setRevealedFileIds] = useState(() => new Set<string>())
  const [content, setContent] = useState<TServiceConfigContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contentError, setContentError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)
  const [contentRequestVersion, setContentRequestVersion] = useState(0)
  const selectedFile = manifest?.files.find((file) => file.id === selectedFileId) || null
  const selectedRevealed = selectedFileId ? revealedFileIds.has(selectedFileId) : false

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    void fetchServiceConfig(serviceId, controller.signal)
      .then((nextManifest) => {
        setManifest(nextManifest)
        setSelectedFileId(nextManifest.files[0]?.id || null)
        setRevealedFileIds(new Set())
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : 'Could not load service configuration.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [requestVersion, serviceId])

  useEffect(() => {
    if (!selectedFileId) {
      setContent(null)
      setContentLoading(false)
      setContentError(null)
      return
    }

    const controller = new AbortController()
    setContent(null)
    setContentLoading(true)
    setContentError(null)

    void fetchServiceConfigContent(serviceId, selectedFileId, selectedRevealed, controller.signal)
      .then(setContent)
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          setContentError(
            cause instanceof Error ? cause.message : 'Could not load configuration file.',
          )
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setContentLoading(false)
      })

    return () => controller.abort()
  }, [contentRequestVersion, selectedFileId, selectedRevealed, serviceId])

  const toggleSelectedReveal = useCallback(() => {
    if (!selectedFileId) return
    setRevealedFileIds((current) => {
      const next = new Set(current)
      if (next.has(selectedFileId)) next.delete(selectedFileId)
      else next.add(selectedFileId)
      return next
    })
  }, [selectedFileId])

  return {
    manifest,
    selectedFile,
    selectedFileId,
    selectedRevealed,
    content,
    loading,
    contentLoading,
    error,
    contentError,
    selectFile: setSelectedFileId,
    refresh: () => setRequestVersion((value) => value + 1),
    retryContent: () => setContentRequestVersion((value) => value + 1),
    toggleSelectedReveal,
  }
}
