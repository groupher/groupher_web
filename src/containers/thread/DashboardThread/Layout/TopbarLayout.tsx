import { FC, memo } from 'react'

import type { TTopbarLayout, TColorName } from '@/spec'

import { TOPBAR_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import { callDashboardDesc } from '@/signal'

import { Br, Inline } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'
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
  Bar,
  TopBar,
  Main,
  ListsWrapper,
  TagssWrapper,
  BgWrapper,
  BgLabel,
  TheColor,
} from '../styles/layout/topbar_layout'
import { edit } from '../logic'

type TProps = {
  layout: TTopbarLayout
  isLayoutTouched: boolean
  isBgTouched: boolean
  saving: boolean
  bg: TColorName
}

const TopbarLayout: FC<TProps> = ({ layout, isLayoutTouched, isBgTouched, saving, bg }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="Topbar 样式"
        desc={
          <>
            全局 Topbar 的样式。
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
        <Layout onClick={() => edit(TOPBAR_LAYOUT.YES, 'topbarLayout')}>
          <Block $active={layout === TOPBAR_LAYOUT.YES}>
            <TopBar bg={bg}>--</TopBar>

            <Main>
              <ListsWrapper>
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
                <Br bottom={14} />
                <Bar long={40} thin />
                <Br bottom={14} />
              </ListsWrapper>
              <TagssWrapper>
                <Br bottom={10} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
              </TagssWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === TOPBAR_LAYOUT.YES}>
            <CheckLabel
              title="有 Topbar"
              $active={layout === TOPBAR_LAYOUT.YES}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(TOPBAR_LAYOUT.NO, 'topbarLayout')}>
          <Block $active={layout === TOPBAR_LAYOUT.NO}>
            <Main>
              <ListsWrapper>
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
                <Br bottom={14} />
                <Bar long={40} thin />
                <Br bottom={14} />
              </ListsWrapper>
              <TagssWrapper>
                <Br bottom={10} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
              </TagssWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === TOPBAR_LAYOUT.NO}>
            <CheckLabel
              title="无 Topbar"
              $active={layout === TOPBAR_LAYOUT.NO}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isLayoutTouched}
        field={SETTING_FIELD.TOPBAR_LAYOUT}
        loading={saving}
        top={20}
      />

      {layout === TOPBAR_LAYOUT.YES && (
        <>
          <Br top={30} />
          <SavingBar isTouched={isBgTouched} field={SETTING_FIELD.TOPBAR_BG} loading={saving}>
            <BgWrapper>
              <div>颜色:</div>
              <BgLabel bg={bg}>
                <ColorSelector
                  activeColor={bg}
                  onChange={(color) => edit(color, 'topbarBg')}
                  placement="right"
                  offset={[-1, 15]}
                >
                  <TheColor color={bg} />
                </ColorSelector>
              </BgLabel>
            </BgWrapper>
          </SavingBar>
        </>
      )}
    </Wrapper>
  )
}

export default memo(TopbarLayout)
