/* *
 * WallpaperEditor
 *
 */

import { FC } from 'react'

import { bond } from '@/utils/mobx'
import { DRAWER_SCROLLER } from '@/constant/dom'
import VIEW from '@/constant/view'

import { DesktopOnly, MobileOnly, Br } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'
import CustomScroller from '@/widgets/CustomScroller'

import type { TStore } from './store'
import { TAB, TAB_OPTIONS } from './constant'

import BuildIn from './BuildIn'
import Custom from './Custom'
import Footer from './Footer'

import { Wrapper, Banner, Title, Content } from './styles'
import { useInit, changeTab } from './logic'

type TProps = {
  wallpaperEditor?: TStore
  testid?: string
}

const WallpaperEditorContainer: FC<TProps> = ({
  wallpaperEditor: store,
  testid = 'wallpaper-editor',
}) => {
  useInit(store)
  const { tab, wallpaperData, isTouched } = store

  return (
    <Wrapper testid={testid}>
      <Banner>
        <Title>壁纸设置</Title>
        <Tabs items={TAB_OPTIONS} activeKey={tab} onChange={changeTab} view={VIEW.DRAWER} />
      </Banner>

      <MobileOnly>
        <Content>
          {tab === TAB.BUILDIN && <BuildIn wallpaperData={wallpaperData} />}
          {tab === TAB.CUSTOM && <Custom />}
        </Content>
      </MobileOnly>
      <DesktopOnly>
        <CustomScroller
          instanceKey={DRAWER_SCROLLER}
          direction="vertical"
          height="calc(100vh - 226px)"
          barSize="small"
          showShadow={false}
          autoHide={false}
        >
          <Content>
            {tab === TAB.BUILDIN && <BuildIn wallpaperData={wallpaperData} />}
            {tab === TAB.CUSTOM && <Custom />}
          </Content>
        </CustomScroller>
      </DesktopOnly>
      <Footer wallpaperType={wallpaperData.wallpaperType} isTouched={isTouched} />
    </Wrapper>
  )
}

export default bond(WallpaperEditorContainer, 'wallpaperEditor') as FC<TProps>
