import { FC, memo } from 'react'

import type { THelpLayout } from '@/spec'

import { HELP_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import { callDashboardDesc } from '@/utils/signal'

import { Br, Inline } from '@/widgets/Common'
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
  Box3,
  Main,
  ListsWrapper,
  FAQFullWrapper,
} from '../styles/layout/help_layout'
import { edit } from '../logic'

type TProps = {
  layout: THelpLayout
  isTouched: boolean
  saving: boolean
}

const HelpLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="常见问题布局"
        desc={
          <>
            当前设置仅针对常见问题的展示样式。
            <Inline>
              <ArrowButton onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}>
                查看示例
              </ArrowButton>
            </Inline>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(HELP_LAYOUT.FAQ_COLLAPSE, 'helpLayout')}>
          <Block $active={layout === HELP_LAYOUT.FAQ_COLLAPSE}>
            <Br bottom={14} />
            <Main>
              <FAQFullWrapper>
                <Bar long={30} />
                <Br bottom={20} />
                <Bar long={60} thin bold />
                <Br bottom={10} />
                <Bar long={85} thin />
                <Br bottom={10} />
                <Bar long={50} thin bold />
                <Br bottom={10} />
                <Bar long={60} thin />
                <Br bottom={10} />
                <Bar long={50} thin bold />
                <Br bottom={10} />
                <Bar long={60} thin />
              </FAQFullWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === HELP_LAYOUT.FAQ_COLLAPSE}>
            <CheckLabel
              title="可折叠"
              $active={layout === HELP_LAYOUT.FAQ_COLLAPSE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(HELP_LAYOUT.FAQ_FLAT, 'helpLayout')}>
          <Block $active={layout === HELP_LAYOUT.FAQ_FLAT}>
            <Br bottom={14} />
            <Main>
              <ListsWrapper>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box3>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box3>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={20} />
                </Box3>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box3>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box3>
              </ListsWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === HELP_LAYOUT.FAQ_FLAT}>
            <CheckLabel
              title="铺开式"
              $active={layout === HELP_LAYOUT.FAQ_FLAT}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.HELP_LAYOUT}
        loading={saving}
        top={20}
        bottom={30}
      />
    </Wrapper>
  )
}

export default memo(HelpLayout)
