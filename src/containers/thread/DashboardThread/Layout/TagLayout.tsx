import { TAG_LAYOUT } from '@/const/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import useTags from '../logic/useTags'

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

export default () => {
  const { edit, tagLayout, getTagLayoutTouched, saving } = useTags()
  const primaryColor = usePrimaryColor()
  const isTouched = getTagLayoutTouched()

  return (
    <Wrapper>
      <SectionLabel title="标签样式" desc="列表内容及文章详情的标签的展现形式。" />
      <SelectWrapper>
        <Layout onClick={() => edit(TAG_LAYOUT.HASH, 'tagLayout')}>
          <Block $active={tagLayout === TAG_LAYOUT.HASH} $color={primaryColor}>
            <TagItem>
              <HashTagIcon $color={primaryColor} />
              <Bar />
            </TagItem>

            <TagItem>
              <BgWrapper $color={primaryColor}>
                <HashTagIcon $color={primaryColor} />
              </BgWrapper>
              <Bar />
            </TagItem>
          </Block>

          <LayoutTitle $active={tagLayout === TAG_LAYOUT.HASH}>
            <CheckLabel title="井字" $active={tagLayout === TAG_LAYOUT.HASH} top={15} left={-15} />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(TAG_LAYOUT.DOT, 'tagLayout')}>
          <Block $active={tagLayout === TAG_LAYOUT.DOT} $color={primaryColor}>
            <TagItem>
              <Dot $color={primaryColor} />
              <Bar />
            </TagItem>

            <TagItem>
              <BgWrapper $color={primaryColor}>
                <Dot $color={primaryColor} />
              </BgWrapper>
              <Bar />
            </TagItem>
          </Block>

          <LayoutTitle $active={tagLayout === TAG_LAYOUT.DOT}>
            <CheckLabel title="圆点" $active={tagLayout === TAG_LAYOUT.DOT} top={15} left={-15} />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.TAG_LAYOUT}
        loading={saving}
        left={-5}
        width="580px"
        top={25}
      />
    </Wrapper>
  )
}
