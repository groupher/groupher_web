'use client'

import { use } from 'react'

import { DsbConfigContext } from './context'

/** Reads the dashboard config supplied by the current host shell. */
export default function useDsbConfig() {
  const config = use(DsbConfigContext)

  if (!config) throw new Error('useDsbConfig must be used within DsbConfigProvider')

  return config
}
