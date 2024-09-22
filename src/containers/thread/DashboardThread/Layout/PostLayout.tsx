import { POST_LAYOUT, DASHBOARD_DESC_LAYOUT } from '~/const/layout'
import { callDashboardDesc } from '~/signal'

import UpvoteSVG from '~/icons/Upvote'
import CommentSVG from '~/icons/Comment'

import { Row, Br, Space } from '~/widgets/Common'
import ArrowButton from '~/widgets/Buttons/ArrowButton'
import CheckLabel from '~/widgets/CheckLabel'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import usePost from '../logic/usePost'
import useSalon, {
  cn,
  Border,
  Bar,
  Circle,
  Box,
  Cover,
  Column,
  UpvoteIcon,
  CommentIcon,
} from '../styles/layout/post_layout'

export default () => {
  const s = useSalon()
  const { layout, getIsTouched, saving, edit } = usePost()

  const isTouched = getIsTouched()

  return (
    <div className={s.wrapper}>
      <SectionLabel
        title="讨论区布局"
        desc={
          <>
            「讨论区」列表的默认布局，切换布局不影响已发布内容。
            <div className={s.inline}>
              <ArrowButton onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}>
                查看示例
              </ArrowButton>
            </div>
          </>
        }
      />
      <div className={s.select}>
        <div className={s.layout} onClick={() => edit(POST_LAYOUT.QUORA, 'postLayout')}>
          <div className={cn(s.block, layout === POST_LAYOUT.QUORA && s.blockActive)}>
            <div className={cn(s.bar, 'left-4 top-5 h-1 opacity-30')} />

            <div className={cn(s.bar, 'left-4 top-8 w-28 h-2.5 opacity-50')} />
            <div className={cn(s.bar, 'left-4 top-12 w-48 mt-0.5 opacity-30')} />

            <CommentSVG className={cn(s.commentIcon, 'right-5 top-5')} />

            <UpvoteSVG className={cn(s.upvoteIcon, 'left-4 bottom-3')} />
            <div className={cn(s.bar, 'left-10 bottom-4 w-10 h-2 opacity-40')} />
            <div className={cn(s.bar, 'left-24 bottom-4 w-10 h-1 mb-0.5 opacity-20')} />
          </div>
          <CheckLabel title="经典（默认）" active={layout === POST_LAYOUT.QUORA} top={4} />
        </div>
        <div className={s.layout} onClick={() => edit(POST_LAYOUT.PH, 'postLayout')}>
          <div className={cn(s.block, layout === POST_LAYOUT.PH && s.blockActive)}>
            <Row>
              <Column center>
                <Circle />
                <Br bottom={18} />
              </Column>
              <Space right={12} />
              <Column grow>
                <Row>
                  <Bar long={50} />
                  <Space right={5} />
                  <Bar thin long={8} />
                  <div className="grow" />
                  <UpvoteIcon size={20} />
                </Row>
                <Br bottom={5} />
                <Bar thin long={80} />
                <Br bottom={11} />
                <Row>
                  <Bar long={20} />
                  <Space right={12} />
                  <Bar thin long={20} />
                </Row>
              </Column>
            </Row>
          </div>
          <CheckLabel title="三段式" active={layout === POST_LAYOUT.PH} top={15} />
        </div>

        <div className={s.layout} onClick={() => edit(POST_LAYOUT.MASONRY, 'postLayout')}>
          <div className={cn(s.block, layout === POST_LAYOUT.MASONRY && s.blockActive)}>
            <Row>
              <Column grow>
                <Box />
                <Bar thin long={70} />
              </Column>
              <Space right={12} />
              <Column grow>
                <Box />
                <Bar thin long={80} />
              </Column>
            </Row>
          </div>
          <CheckLabel title="瀑布流卡片" active={layout === POST_LAYOUT.MASONRY} top={4} />
        </div>

        <div className={s.layout} onClick={() => edit(POST_LAYOUT.MINIMAL, 'postLayout')}>
          <div className={cn(s.block, layout === POST_LAYOUT.MINIMAL && s.blockActive)}>
            <Row>
              <Space right={5} />
              <Column center>
                <Border>
                  <UpvoteIcon size={14} />
                  <Br bottom={3} />
                  <Bar long={70} />
                </Border>
              </Column>

              <Space right={15} />

              <Column grow>
                <Br bottom={10} />
                <Row>
                  <Br bottom={10} />
                  <Bar long={30} />
                  <div className="grow" />
                  <CommentIcon />
                </Row>
                <Br bottom={11} />
                <Bar thin long={80} />
                <Br bottom={10} />
                <Row>
                  <Bar thin long={20} />
                </Row>
              </Column>
            </Row>
          </div>
          <CheckLabel title="极简" active={layout === POST_LAYOUT.MINIMAL} top={15} />
        </div>

        <div className={s.layout} onClick={() => edit(POST_LAYOUT.COVER, 'postLayout')}>
          <div className={cn(s.block, layout === POST_LAYOUT.COVER && s.blockActive)}>
            <Row>
              <Cover />
              <Space right={17} />
              <Column grow>
                <Column>
                  <Bar long={50} />
                </Column>
                <Br bottom={10} />
                <Bar thin long={90} />
                <Br bottom={20} />
                <Row>
                  <Bar thin long={20} />
                </Row>
              </Column>
            </Row>
          </div>
          <CheckLabel title="封面图" active={layout === POST_LAYOUT.COVER} top={4} />
        </div>
      </div>

      <SavingBar
        width="84%"
        isTouched={isTouched}
        field={SETTING_FIELD.POST_LAYOUT}
        loading={saving}
        top={20}
      />
    </div>
  )
}
