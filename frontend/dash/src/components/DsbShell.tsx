import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouterState } from '@tanstack/react-router'
import { type ReactNode, useEffect } from 'react'

import { GlobalProvider } from '~/app/providers'
import METRIC from '~/const/metric'
import { Q } from '~/query'
import DsbEditProvider from '~/stores/dsbEdit/provider'
import { DsbEditorUiProvider } from '~/stores/dsbEditorUi'
import { DsbShellUiProvider } from '~/stores/dsbShellUi'
import { MetricProvider } from '~/stores/metric'
import StaticWallpaperProvider from '~/stores/staticWallpaper/provider'
import ThemePresetStoreProvider from '~/stores/ThemePreset/provider'
import WallpaperStoreProvider from '~/stores/wallpaper/provider'
import WallpaperRuntimeProvider from '~/stores/wallpaperRuntime/provider'
import CommunityDigest from '~/unit/CommunityDigest/DsbLayout'
import { SideMenu } from '~/unit/DsbThread'

import { clearAuthRouteRecoveryAttempt } from '../utils/auth-route-recovery'

type TProps = {
  children: ReactNode
  shell: {
    community: string
    demoMode: boolean
  }
}

export default function DsbShell({ children, shell }: TProps) {
  const { data: dashboard } = useSuspenseQuery(Q.dsb.config(shell.community))
  const { data: wallpaper } = useSuspenseQuery(Q.wallpaper.config(shell.community))
  const wallpaperRuntimeMode = useRouterState({
    select: (state) =>
      state.matches.some((match) => match.routeId === '/$community/appearance/wallpaper')
        ? 'editor'
        : 'static',
  })

  useEffect(() => {
    clearAuthRouteRecoveryAttempt(window.location.href)
  }, [])

  const content = (
    <ThemePresetStoreProvider initData={dashboard}>
      <StaticWallpaperProvider initData={wallpaper?.staticWallpaper}>
        <WallpaperStoreProvider initData={wallpaper}>
          <WallpaperRuntimeProvider mode={wallpaperRuntimeMode}>
            <GlobalProvider authLoginModal={false}>
              <div
                className='column-center min-h-full w-full justify-start'
                data-demo-mode={shell.demoMode}
              >
                <div className='container-dashboard relative w-full transition-all duration-150 ease-out'>
                  <CommunityDigest />

                  <div className='row mt-7 min-h-screen w-full'>
                    <div className='shrink-0 self-stretch overflow-visible transition-all duration-150 ease-out'>
                      <SideMenu />
                    </div>
                    <div className='column min-w-0 grow items-center bg-transparent'>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </GlobalProvider>
          </WallpaperRuntimeProvider>
        </WallpaperStoreProvider>
      </StaticWallpaperProvider>
    </ThemePresetStoreProvider>
  )

  return (
    <MetricProvider value={METRIC.DASHBOARD}>
      <DsbShellUiProvider>
        <DsbEditorUiProvider>
          {shell.demoMode ? (
            content
          ) : (
            <DsbEditProvider initialData={dashboard}>{content}</DsbEditProvider>
          )}
        </DsbEditorUiProvider>
      </DsbShellUiProvider>
    </MetricProvider>
  )
}
