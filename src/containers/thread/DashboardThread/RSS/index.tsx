import { FC, memo } from 'react'

import Radio from '@/widgets/Switcher/Radio'
import RangeSlider from '@/widgets/RangeSlider'

import Portal from '../Portal'
import SavingBar from '../SavingBar'

import useRSSInfo from '../hooks/useRSSInfo'
import { Wrapper, InnerWrapper, SettingsRow, NumRow, SettingTitle } from '../styles/rss'
import { edit, rssOnSave, rssOnCancel } from '../logic'

const RSS: FC = () => {
  const { rssFeedType, rssFeedCount, saving, isTouched } = useRSSInfo()

  return (
    <Wrapper>
      <Portal title="RSS 设置" desc="RSS 设置说明。" />
      <InnerWrapper>
        <SettingsRow>
          <SettingTitle>Feed 类型</SettingTitle>
          <Radio
            size="small"
            items={[
              {
                value: '帖子全文',
                key: 'full',
              },
              {
                value: '帖子摘要',
                key: 'digest',
              },
            ]}
            activeKey={rssFeedType}
            onChange={(item) => edit(item.key, 'rssFeedType')}
          />
        </SettingsRow>

        <NumRow>
          <SettingTitle>Feed 数目</SettingTitle>
          <RangeSlider
            width="160px"
            bottom={5}
            value={rssFeedCount}
            min={5}
            max={50}
            onChange={(v) => edit(v, 'rssFeedCount')}
            unit="条"
          />
        </NumRow>

        <SavingBar
          isTouched={isTouched}
          onCancel={() => rssOnCancel()}
          onConfirm={() => rssOnSave()}
          loading={saving}
          top={50}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(RSS)
