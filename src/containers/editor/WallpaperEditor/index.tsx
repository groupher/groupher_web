/* *
 * WallpaperEditor
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import VIEW from '@/const/view'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'

import { useStore } from './store'
import { TAB, TAB_OPTIONS } from './constant'

import BuildIn from './BuildIn'
import UploadPic from './UploadPic'
import Footer from './Footer'

import { Wrapper, Banner, Title, Content } from './styles'
import { useInit, changeTab } from './logic'

const WallpaperEditor: FC = () => {
  const store = useStore()
  useInit(store)
  const { tab, wallpaperData, isTouched, loading } = store

  return (
    <Wrapper $testid="wallpaper-editor">
      <Banner>
        <Title>壁纸设置</Title>
        <Tabs items={TAB_OPTIONS} activeKey={tab} onChange={changeTab} view={VIEW.DRAWER} />
      </Banner>

      <MobileOnly>
        <Content>
          {tab === TAB.BUILDIN && <BuildIn wallpaperData={wallpaperData} />}
          {tab === TAB.UPLOAD && <UploadPic />}
        </Content>
      </MobileOnly>
      <DesktopOnly>
        <Content>
          {tab === TAB.BUILDIN && <BuildIn wallpaperData={wallpaperData} />}
          {tab === TAB.UPLOAD && <UploadPic />}
        </Content>
      </DesktopOnly>

      <Footer wallpaperType={wallpaperData.wallpaperType} isTouched={isTouched} loading={loading} />
    </Wrapper>
  )
}

export default observer(WallpaperEditor)
