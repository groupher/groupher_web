import { CHANGELOG_LAYOUT, DASHBOARD_DESC_LAYOUT } from '~/const/layout'
import usePrimaryColor from '~/hooks/usePrimaryColor'
import { callDashboardDesc } from '~/signal'

import { Row, Br, Space, Divider, Inline } from '~/widgets/Common'
import ArrowButton from '~/widgets/Buttons/ArrowButton'
import CheckLabel from '~/widgets/CheckLabel'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import useChangelog from '../logic/useChangelog'
import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  Bar,
  MiniBar,
  MiniItem,
  MiniIntro,
  Column,
  UpvoteIcon,
  Picture,
} from '../styles/layout/changelog_layout'

export default () => {
  const { edit, layout, getIsTouched, saving } = useChangelog()
  const primaryColor = usePrimaryColor()
  const isTouched = getIsTouched()

  return (
    <Wrapper>
      <SectionLabel
        title="更新日志布局"
        desc={
          <>
            「更新日志」列表的默认展现形式，切换布局不影响已发布内容。
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
        <Layout onClick={() => edit(CHANGELOG_LAYOUT.CLASSIC, 'changelogLayout')}>
          <Block $active={layout === CHANGELOG_LAYOUT.CLASSIC} $color={primaryColor}>
            <Column>
              <Picture />
              <Br top={14} />
              <Row>
                <Bar long={60} />
                <Space right={10} />
                <Bar thin long={10} />
              </Row>
              <Br bottom={15} />
              <Bar long={80} thin />
              <Br top={10} />
              <Bar long={30} thin />
              <Br top={10} />
              <Row>
                <UpvoteIcon size={12} />
                <Space right={5} />
                <Bar long={12} thin />
              </Row>
            </Column>
            <Divider />
            <Column>
              <Picture />
              <Br top={14} />
              <Row>
                <Bar long={60} />
                <Space right={10} />
                <Bar thin long={10} />
              </Row>
              <Br bottom={15} />
              <Bar long={80} thin />
              <Br top={10} />
              <Bar long={30} thin />
              <Br top={10} />
              <Row>
                <UpvoteIcon size={12} />
                <Space right={5} />
                <Bar long={12} thin />
              </Row>
            </Column>
          </Block>
          <LayoutTitle $active={layout === CHANGELOG_LAYOUT.CLASSIC}>
            <CheckLabel
              title="经典模式"
              $active={layout === CHANGELOG_LAYOUT.CLASSIC}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(CHANGELOG_LAYOUT.SIMPLE, 'changelogLayout')}>
          <Block $active={layout === CHANGELOG_LAYOUT.SIMPLE} $color={primaryColor}>
            <MiniItem>
              <MiniBar long={10} thin />
              <MiniIntro>
                <Row>
                  <MiniBar long={46} />
                  <Space right={5} />
                  <MiniBar thin long={8} />
                  <div className="grow" />
                </Row>
                <Br top={8} />
                <MiniBar thin long={90} />
                <Br top={8} />
                <MiniBar thin long={80} />
                <Br top={8} />
                <MiniBar thin long={40} />

                <Br top={8} />
                <MiniBar long={20} />
              </MiniIntro>
            </MiniItem>
            <Br top={24} />
            <MiniItem>
              <MiniBar long={10} thin />
              <MiniIntro>
                <Row>
                  <MiniBar long={46} />
                  <Space right={5} />
                  <MiniBar thin long={8} />
                  <div className="grow" />
                </Row>
                <Br top={8} />
                <MiniBar thin long={90} />
                <Br top={8} />
                <MiniBar thin long={80} />
                <Br top={8} />
                <MiniBar thin long={40} />

                <Br top={8} />
                <MiniBar long={20} />
              </MiniIntro>
            </MiniItem>
            <Br top={24} />
            <MiniItem>
              <MiniBar long={10} thin />
              <MiniIntro>
                <Row>
                  <MiniBar long={46} />
                  <Space right={5} />
                  <MiniBar thin long={8} />
                  <div className="grow" />
                </Row>
                <Br top={8} />
                <MiniBar thin long={90} />
                <Br top={8} />
                <MiniBar thin long={80} />
                <Br top={8} />
                <MiniBar thin long={40} />

                <Br top={8} />
                <MiniBar long={20} />
              </MiniIntro>
            </MiniItem>
            <Br top={24} />
            <MiniItem>
              <MiniBar long={10} thin />
              <MiniIntro>
                <Row>
                  <MiniBar long={46} />
                  <Space right={5} />
                  <MiniBar thin long={8} />
                  <div className="grow" />
                </Row>
                <Br top={8} />
                <MiniBar thin long={90} />
                <Br top={8} />
                <MiniBar thin long={80} />
                <Br top={8} />
                <MiniBar thin long={40} />

                <Br top={8} />
                <MiniBar long={20} />
              </MiniIntro>
            </MiniItem>
          </Block>

          <LayoutTitle $active={layout === CHANGELOG_LAYOUT.SIMPLE}>
            <CheckLabel
              title="极简模式"
              $active={layout === CHANGELOG_LAYOUT.SIMPLE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>

      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.CHANGELOG_LAYOUT}
        loading={saving}
        top={20}
      />
    </Wrapper>
  )
}
