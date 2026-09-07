import { createContext } from 'react'

import type { TParseDashboard } from '~/spec'

export const DsbConfigContext = createContext<TParseDashboard | null>(null)

DsbConfigContext.displayName = 'DsbConfig'
