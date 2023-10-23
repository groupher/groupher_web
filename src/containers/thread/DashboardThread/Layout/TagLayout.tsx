import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TTagLayout } from '@/spec'

import { TAG_LAYOUT } from '@/constant/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  TagItem,
  Dot,
  BgWrapper,
  HashTagIcon,
  Bar,
} from '../styles/layout/tag_layout'
import { edit } from '../logic'

type TProps = {
  layout: TTagLayout
  isTouched: boolean
  saving: boolean
}

const TagLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <SectionLabel title="标签样式" desc={<>列表内容及文章详情的标签的展现形式。</>} />
      <SelectWrapper>
        <Layout onClick={() => edit(TAG_LAYOUT.HASH, 'tagLayout')}>
          <Block $active={layout === TAG_LAYOUT.HASH} primaryColor={primaryColor}>
            <TagItem>
              <HashTagIcon color={primaryColor} />
              <Bar />
            </TagItem>

            <TagItem>
              <BgWrapper color={primaryColor}>
                <HashTagIcon color={primaryColor} />
              </BgWrapper>
              <Bar />
            </TagItem>
          </Block>

          <LayoutTitle $active={layout === TAG_LAYOUT.HASH}>
            <CheckLabel title="井字" $active={layout === TAG_LAYOUT.HASH} top={15} left={-15} />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(TAG_LAYOUT.DOT, 'tagLayout')}>
          <Block $active={layout === TAG_LAYOUT.DOT} primaryColor={primaryColor}>
            <TagItem>
              <Dot color={primaryColor} />
              <Bar />
            </TagItem>

            <TagItem>
              <BgWrapper color={primaryColor}>
                <Dot color={primaryColor} />
              </BgWrapper>
              <Bar />
            </TagItem>
          </Block>

          <LayoutTitle $active={layout === TAG_LAYOUT.DOT}>
            <CheckLabel title="圆点" $active={layout === TAG_LAYOUT.DOT} top={15} left={-15} />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.TAG_LAYOUT}
        loading={saving}
        width="80%"
        top={25}
      />
    </Wrapper>
  )
}

export default observer(TagLayout)
