import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TBrandLayout } from '@/spec'

import { BRAND_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { callDashboardDesc } from '@/signal'

import { Space, Divider, Inline } from '@/widgets/Common'
import ArrowButton from '@/widgets/Buttons/ArrowButton'
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
  Brand,
  BrandIcon,
  BrandTitle,
} from '../styles/layout/brand_layout'
import { edit } from '../logic'

type TProps = {
  layout: TBrandLayout
  isTouched: boolean
  saving: boolean
}

const LogoLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <SectionLabel
        title="Logo 样式"
        desc={
          <>
            页首 Logo 的展示形式。
            <Inline>
              <ArrowButton
                onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}
                fontSize={12}
              >
                查看示例
              </ArrowButton>
            </Inline>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(BRAND_LAYOUT.BOTH, 'brandLayout')}>
          <Block $active={layout === BRAND_LAYOUT.BOTH} $color={primaryColor}>
            <Brand>
              <BrandIcon />
              <Space right={7} />
              <BrandTitle>Groupher</BrandTitle>
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
              <BrandTitle>Groupher</BrandTitle>
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
        top={20}
      />
    </Wrapper>
  )
}

export default observer(LogoLayout)
