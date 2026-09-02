'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import useCommunity from '~/stores/community/hooks'

import { dsbQueries } from './dsb'

/** Reads the confirmed dashboard config from the canonical Query cache. */
export default function useDsbConfig() {
  const { slug } = useCommunity()
  return useSuspenseQuery(dsbQueries.config(slug)).data
}
