import { FC, memo } from 'react'

import type { THelpFAQLayout, THelpLayout } from '@/spec'

import { HELP_LAYOUT, HELP_FAQ_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import { callDashboardDesc } from '@/utils/signal'

import { Br, Divider } from '@/widgets/Common'
import ArrowButton from '@/widgets/Buttons/ArrowButton'
import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../../constant'
import SectionLabel from '../../SectionLabel'
import SavingBar from '../../SavingBar'

import MainTemplate from './MainTemplate'
import FaqTemplate from './FaqTemplate'

import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  Main,
} from '../../styles/layout/help_layout'
import { edit } from '../../logic'

type TProps = {
  layout: THelpLayout
  faqLayout: THelpFAQLayout
  isTouched: boolean
  isFaqTouched: boolean
  saving: boolean
}

const HelpLayout: FC<TProps> = ({ layout, faqLayout, isTouched, isFaqTouched, saving }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="封面目录布局"
        desc={
          <>
            全部文档的目录布局。
            <ArrowButton
              onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}
              bottom={1}
              size="small"
              linkColor
            >
              查看示例
            </ArrowButton>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(HELP_LAYOUT.BLOCKS, 'helpLayout')}>
          <Block $active={layout === HELP_LAYOUT.BLOCKS}>
            <Br bottom={14} />
            <Main>
              <MainTemplate layout={HELP_LAYOUT.BLOCKS} />
            </Main>
          </Block>
          <LayoutTitle $active={layout === HELP_LAYOUT.BLOCKS}>
            <CheckLabel
              title="块状排列"
              $active={layout === HELP_LAYOUT.BLOCKS}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(HELP_LAYOUT.LISTS, 'helpLayout')}>
          <Block $active={layout === HELP_LAYOUT.LISTS}>
            <Br bottom={14} />
            <Main>
              <MainTemplate layout={HELP_LAYOUT.LISTS} />
            </Main>
          </Block>
          <LayoutTitle $active={layout === HELP_LAYOUT.LISTS}>
            <CheckLabel
              title="列表排列"
              $active={layout === HELP_LAYOUT.LISTS}
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

      <Divider top={50} bottom={60} />

      <SectionLabel
        title="常见问题（FAQ）布局"
        desc={
          <>
            当前设置仅针对常见问题的展示样式。
            <ArrowButton
              onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}
              bottom={1}
              size="small"
              linkColor
            >
              查看示例
            </ArrowButton>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(HELP_FAQ_LAYOUT.COLLAPSE, 'helpFaqLayout')}>
          <Block $active={faqLayout === HELP_FAQ_LAYOUT.COLLAPSE}>
            <Br bottom={14} />
            <Main>
              <FaqTemplate layout={HELP_FAQ_LAYOUT.COLLAPSE} />
            </Main>
          </Block>
          <LayoutTitle $active={faqLayout === HELP_FAQ_LAYOUT.COLLAPSE}>
            <CheckLabel
              title="可折叠"
              $active={faqLayout === HELP_FAQ_LAYOUT.COLLAPSE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(HELP_FAQ_LAYOUT.FLAT, 'helpFaqLayout')}>
          <Block $active={faqLayout === HELP_FAQ_LAYOUT.FLAT}>
            <Br bottom={14} />
            <Main>
              <FaqTemplate layout={HELP_FAQ_LAYOUT.FLAT} />
            </Main>
          </Block>
          <LayoutTitle $active={faqLayout === HELP_FAQ_LAYOUT.FLAT}>
            <CheckLabel
              title="铺开式"
              $active={faqLayout === HELP_FAQ_LAYOUT.FLAT}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isFaqTouched}
        field={SETTING_FIELD.HELP_FAQ_LAYOUT}
        loading={saving}
        top={20}
        bottom={30}
      />
    </Wrapper>
  )
}

export default memo(HelpLayout)
