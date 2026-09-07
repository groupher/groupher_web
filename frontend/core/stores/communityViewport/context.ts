import { createContext } from 'react'

export type TCommunityViewportContext = {
  inView: boolean
  setInView: (inView: boolean) => void
}

export const CommunityViewportContext = createContext<TCommunityViewportContext | null>(null)
CommunityViewportContext.displayName = 'CommunityViewportContext'
