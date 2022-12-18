import { FC, memo } from 'react'

import { Divider } from '@/widgets/Common'

import Portal from '../Portal'
import BrandLayout from './BrandLayout'
import BannerLayout from './BannerLayout'
import HelpLayout from './HelpLayout'
import PostListLayout from './PostListLayout'
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
    bannerNotifyLayout,
    bannerNotifyBg,
    postLayout,
    fileTreeDirection,
    saving,
  } = settings

  return (
    <Wrapper>
      <Portal title="板块布局" desc="社区板块自定义布局。" />
      <BrandLayout layout={brandLayout} isTouched={touched.brandLayout} saving={saving} />
      <Divider top={20} bottom={60} />
      <BannerLayout layout={bannerLayout} isTouched={touched.bannerLayout} saving={saving} />
      <Divider top={20} bottom={60} />
      <PostListLayout layout={postLayout} isTouched={touched.postLayout} saving={saving} />
      <Divider top={20} bottom={60} />
      <HelpLayout
        layout={helpLayout}
        isTouched={touched.helpLayout}
        fileTreeDirection={fileTreeDirection}
        isFileTreeDirectionTouched={touched.fileTreeDirection}
        saving={saving}
      />
      <Divider top={20} bottom={60} />
      {/* <ChangelogLayout
        layout={changelogLayout}
        isTouched={touched.changelogLayout}
        saving={saving}
      />
      <Divider top={30} bottom={60} /> */}
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
