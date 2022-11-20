import { FC, memo } from 'react'

import { VIEW, TAG_MODE } from '@/constant'

import TagsBar from '@/containers/unit/TagsBar'
import { Br, Space } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'

import type { TTagsMode } from './spec'
import { TABS_MODE_OPTIONS } from './constant'
import { tagsModeChange } from './logic'
import { Wrapper, BannerText, TabWrapper, SearchInput } from './styles/filters'

type TProps = {
  tagsMode: TTagsMode
}

const Filters: FC<TProps> = ({ tagsMode }) => {
  return (
    <Wrapper>
      <BannerText>
        Groupher 的最新版可以在 [这里] 获取，任何问题欢迎反馈。
      </BannerText>
      {/* <PublishButton>
        <BtnText>新发布</BtnText>
      </PublishButton> */}
      <Br bottom={25} />
      <SearchInput placeholder="搜索内容" />
      <Br bottom={30} />
      <TabWrapper>
        <Tabs
          items={TABS_MODE_OPTIONS}
          size="small"
          activeKey={tagsMode}
          bottomSpace={4}
          onChange={tagsModeChange}
          view={VIEW.DESKTOP}
        />
        <Space right={20} />
      </TabWrapper>
      <TagsBar onSelect={() => console.log} mode={TAG_MODE.LABEL} />
    </Wrapper>
  )
}

export default memo(Filters)
