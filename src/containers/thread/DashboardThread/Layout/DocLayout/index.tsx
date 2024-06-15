import { DOC_LAYOUT, DOC_FAQ_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/const/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { callDashboardDesc } from '@/signal'

import { Br, Divider } from '@/widgets/Common'
import ArrowButton from '@/widgets/Buttons/ArrowButton'
import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../../constant'
import SectionLabel from '../../SectionLabel'
import SavingBar from '../../SavingBar'

import MainTemplate from './MainTemplate'
import FaqTemplate from './FaqTemplate'

import useDoc from '../../logic/useDoc'
import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  Main,
} from '../../styles/layout/doc_layout'

export default () => {
  const { docLayout, docFaqLayout, getIsTouched, getIsFaqTouched, saving, edit } = useDoc()
  const primaryColor = usePrimaryColor()
  const isTouched = getIsTouched()
  const isFaqTouched = getIsFaqTouched()

  return (
    <Wrapper>
      <SectionLabel
        title="封面目录布局"
        desc={
          <>
            全部文档的目录布局。
            <ArrowButton
              onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}
              fontSize={12}
            >
              查看示例
            </ArrowButton>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(DOC_LAYOUT.BLOCKS, 'docLayout')}>
          <Block $active={docLayout === DOC_LAYOUT.BLOCKS} $color={primaryColor}>
            <Br bottom={14} />
            <Main>
              <MainTemplate layout={DOC_LAYOUT.BLOCKS} />
            </Main>
          </Block>
          <LayoutTitle $active={docLayout === DOC_LAYOUT.BLOCKS}>
            <CheckLabel
              title="块状排列"
              $active={docLayout === DOC_LAYOUT.BLOCKS}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(DOC_LAYOUT.LISTS, 'docLayout')}>
          <Block $active={docLayout === DOC_LAYOUT.LISTS} $color={primaryColor}>
            <Br bottom={14} />
            <Main>
              <MainTemplate layout={DOC_LAYOUT.LISTS} />
            </Main>
          </Block>
          <LayoutTitle $active={docLayout === DOC_LAYOUT.LISTS}>
            <CheckLabel
              title="列表排列"
              $active={docLayout === DOC_LAYOUT.LISTS}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(DOC_LAYOUT.CARDS, 'docLayout')}>
          <Block $active={docLayout === DOC_LAYOUT.CARDS} $color={primaryColor}>
            <Br bottom={14} />
            <Main>
              <MainTemplate layout={DOC_LAYOUT.CARDS} />
            </Main>
          </Block>
          <LayoutTitle $active={docLayout === DOC_LAYOUT.CARDS}>
            <CheckLabel
              title="卡片排列"
              $active={docLayout === DOC_LAYOUT.CARDS}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.DOC_LAYOUT}
        loading={saving}
        width="600px"
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
              fontSize={12}
            >
              查看示例
            </ArrowButton>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(DOC_FAQ_LAYOUT.COLLAPSE, 'docFaqLayout')}>
          <Block $active={docFaqLayout === DOC_FAQ_LAYOUT.COLLAPSE} $color={primaryColor}>
            <Br bottom={14} />
            <Main>
              <FaqTemplate layout={DOC_FAQ_LAYOUT.COLLAPSE} />
            </Main>
          </Block>
          <LayoutTitle $active={docFaqLayout === DOC_FAQ_LAYOUT.COLLAPSE}>
            <CheckLabel
              title="可折叠"
              $active={docFaqLayout === DOC_FAQ_LAYOUT.COLLAPSE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(DOC_FAQ_LAYOUT.FLAT, 'docFaqLayout')}>
          <Block $active={docFaqLayout === DOC_FAQ_LAYOUT.FLAT} $color={primaryColor}>
            <Br bottom={14} />
            <Main>
              <FaqTemplate layout={DOC_FAQ_LAYOUT.FLAT} />
            </Main>
          </Block>
          <LayoutTitle $active={docFaqLayout === DOC_FAQ_LAYOUT.FLAT}>
            <CheckLabel
              title="铺开式"
              $active={docFaqLayout === DOC_FAQ_LAYOUT.FLAT}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isFaqTouched}
        field={SETTING_FIELD.DOC_FAQ_LAYOUT}
        loading={saving}
        width="600px"
        top={20}
        bottom={30}
      />
    </Wrapper>
  )
}
