import { FC, memo } from 'react'

import TAG_MODE from '@/constant/tag'
import VIEW from '@/constant/view'

import TagsBar from '@/containers/unit/TagsBar'
import { Br, Space } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'

import type { TTagsMode } from './spec'
import { TABS_MODE_OPTIONS } from './constant'
import { tagsModeChange } from './logic'
import {
  Wrapper,
  BannerText,
  PublishButton,
  TabWrapper,
  BtnText,
  SearchInput,
} from './styles/filters'

type TProps = {
  tagsMode: TTagsMode
}

const Filters: FC<TProps> = ({ tagsMode }) => {
  return (
    <Wrapper>
      <BannerText>Groupher 的最新版可以在 [这里] 获取，任何问题欢迎反馈。</BannerText>
      <Br bottom={20} />
      {/* <PublishButton>
        <BtnText>订阅更新</BtnText>
      </PublishButton> */}
      {/* <Br bottom={20} /> */}
      <SearchInput placeholder="搜索内容" />
      <Br bottom={30} />
      <TabWrapper>
        <Space right={5} />
        <Tabs
          items={TABS_MODE_OPTIONS}
          size="small"
          activeKey={tagsMode}
          bottomSpace={4}
          onChange={tagsModeChange}
          view={VIEW.DESKTOP}
        />
      </TabWrapper>
      <TagsBar onSelect={() => console.log} mode={TAG_MODE.LABEL} />
    </Wrapper>
  )
}

export default memo(Filters)
