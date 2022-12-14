import { FC, memo } from 'react'

import { Divider } from '@/widgets/Common'

import Portal from '../Portal'
import BrandLayout from './BrandLayout'
import BannerLayout from './BannerLayout'
import HelpLayout from './HelpLayout'
import PostLayout from './PostLayout'
import KanbanLayout from './KanbanLayout'
import TopbarLayout from './TopbarLayout'
import BannerNotifyLayout from './BannerNotifyLayout'

import type { TUiSettings, TTouched } from '../spec'
import { Wrapper } from '../styles/ui'

type TProps = {
  settings: TUiSettings
  touched: TTouched
}

const UI: FC<TProps> = ({ settings, touched }) => {
  const {
    brandLayout,
    bannerLayout,
    helpLayout,
    topbarLayout,
    topbarBg,
    bannerNotifyLayout,
    bannerNotifyBg,
    postLayout,
    kanbanLayout,
    saving,
  } = settings

  return (
    <Wrapper>
      <Portal title="板块布局" desc="社区板块自定义布局。" />
      <BrandLayout layout={brandLayout} isTouched={touched.brandLayout} saving={saving} />
      <Divider top={20} bottom={60} />
      <BannerLayout layout={bannerLayout} isTouched={touched.bannerLayout} saving={saving} />
      <Divider top={20} bottom={60} />
      <PostLayout layout={postLayout} isTouched={touched.postLayout} saving={saving} />
      <Divider top={20} bottom={60} />
      <KanbanLayout layout={kanbanLayout} isTouched={touched.kanbanLayout} saving={saving} />
      <Divider top={20} bottom={60} />
      <HelpLayout layout={helpLayout} isTouched={touched.helpLayout} saving={saving} />
      <Divider top={20} bottom={60} />
      <TopbarLayout
        layout={topbarLayout}
        bg={topbarBg}
        isLayoutTouched={touched.topbarLayout}
        isBgTouched={touched.topbarBg}
        saving={saving}
      />
      {/* <ChangelogLayout
        layout={changelogLayout}
        isTouched={touched.changelogLayout}
        saving={saving}
      />
      <Divider top={30} bottom={60} /> */}
      <Divider top={20} bottom={60} />
      <BannerNotifyLayout
        layout={bannerNotifyLayout}
        bg={bannerNotifyBg}
        isLayoutTouched={touched.bannerNotifyLayout}
        isBgTouched={touched.bannerNotifyBg}
        saving={saving}
      />
    </Wrapper>
  )
}

export default memo(UI)
