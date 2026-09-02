'use client'

import createStoreHook from '../createStoreHook'
import { StoreContext } from './context'

/** Exposes the resolved current theme and theme-domain actions to UI consumers. */
const useTheme = createStoreHook(StoreContext, ['change', 'changeMode'])

export default useTheme
