/* *
 * WallpaperEditor
 *
 */

import { useEffect } from 'react'
import VIEW from '@/const/view'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'

import { TAB, TAB_OPTIONS } from './constant'

import BuildIn from './BuildIn'
import UploadPic from './UploadPic'
import Footer from './Footer'

import useLogic from './useLogic'
import { Wrapper, Banner, Title, Content } from './styles'

export default () => {
  const { tab, changeTab, initResetWallpaper } = useLogic()

  useEffect(() => {
    initResetWallpaper()
  }, [])

  return (
    <Wrapper $testid="wallpaper-editor">
      <Banner>
        <Title>壁纸设置</Title>
        <Tabs items={TAB_OPTIONS} activeKey={tab} onChange={changeTab} view={VIEW.DRAWER} />
      </Banner>

      <MobileOnly>
        <Content>
          {tab === TAB.BUILDIN && <BuildIn />}
          {tab === TAB.UPLOAD && <UploadPic />}
        </Content>
      </MobileOnly>
      <DesktopOnly>
        <Content>
          {tab === TAB.BUILDIN && <BuildIn />}
          {tab === TAB.UPLOAD && <UploadPic />}
        </Content>
      </DesktopOnly>

      <Footer />
    </Wrapper>
  )
}
