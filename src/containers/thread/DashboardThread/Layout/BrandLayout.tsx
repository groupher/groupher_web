import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { BRAND_LAYOUT } from '@/const/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import { Space, SexyDivider as Divider } from '@/widgets/Common'
import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import useBrandInfo from '../hooks/useBrandInfo'
import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  Brand,
  BrandIcon,
  BrandTitle,
} from '../styles/layout/brand_layout'
import { edit } from '../logic'

const BrandLayout: FC = () => {
  const primaryColor = usePrimaryColor()
  const curCommunity = useViewingCommunity()
  const { layout, isTouched, saving } = useBrandInfo()

  return (
    <Wrapper>
      <SectionLabel title="品牌样式" desc="页首 Logo 的展示形式，注意文字字体为通用社区字体。" />
      <SelectWrapper>
        <Layout onClick={() => edit(BRAND_LAYOUT.BOTH, 'brandLayout')}>
          <Block $active={layout === BRAND_LAYOUT.BOTH} $color={primaryColor}>
            <Brand>
              <BrandIcon />
              <Space right={7} />
              <BrandTitle>{curCommunity.title}</BrandTitle>
            </Brand>
            <Divider top={15} />
          </Block>
          <LayoutTitle $active={layout === BRAND_LAYOUT.BOTH}>
            <CheckLabel
              title="Logo & 文字"
              $active={layout === BRAND_LAYOUT.BOTH}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(BRAND_LAYOUT.LOGO, 'brandLayout')}>
          <Block $active={layout === BRAND_LAYOUT.LOGO} $color={primaryColor}>
            <Brand>
              <BrandIcon />
            </Brand>
            <Divider top={15} />
          </Block>
          <LayoutTitle $active={layout === BRAND_LAYOUT.LOGO}>
            <CheckLabel
              title="仅 Logo"
              $active={layout === BRAND_LAYOUT.LOGO}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(BRAND_LAYOUT.TEXT, 'brandLayout')}>
          <Block $active={layout === BRAND_LAYOUT.TEXT} $color={primaryColor}>
            <Brand>
              <BrandTitle>{curCommunity.title}</BrandTitle>
            </Brand>
            <Divider top={15} />
          </Block>
          <LayoutTitle $active={layout === BRAND_LAYOUT.TEXT}>
            <CheckLabel title="仅文字" $active={layout === BRAND_LAYOUT.TEXT} top={15} left={-15} />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.BRAND_LAYOUT}
        loading={saving}
        top={36}
      />
    </Wrapper>
  )
}

export default observer(BrandLayout)
