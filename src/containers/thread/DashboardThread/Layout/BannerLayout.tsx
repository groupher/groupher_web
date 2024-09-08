import { BANNER_LAYOUT, DASHBOARD_DESC_LAYOUT } from '~/const/layout'
import { callDashboardDesc } from '~/signal'
import usePrimaryColor from '~/hooks/usePrimaryColor'
import useViewingCommunity from '~/hooks/useViewingCommunity'

import { Row, Br, Space } from '~/widgets/Common'
import CheckLabel from '~/widgets/CheckLabel'
import ArrowButton from '~/widgets/Buttons/ArrowButton'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import useBanner from '../logic/useBanner'
import useSalon, {
  cn,
  DividerLine,
  Bar,
  Circle,
  Main,
  ListsWrapper,
  TagsWrapper,
  SidebarWrapper,
} from '../styles/layout/banner_layout'

export default () => {
  const s = useSalon()

  const { edit, layout, getIsTouched, saving } = useBanner()
  const primaryColor = usePrimaryColor()
  const { title } = useViewingCommunity()

  const isTouched = getIsTouched()

  return (
    <div className={s.wrapper}>
      <SectionLabel
        title="整体布局"
        desc={
          <Row>
            整体页面的 Header 布局，适用于除文章页的所有页面。
            <ArrowButton onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}>
              查看示例
            </ArrowButton>
          </Row>
        }
      />
      <div className={s.select}>
        <div className={s.layout} onClick={() => edit(BANNER_LAYOUT.HEADER, 'bannerLayout')}>
          <div className={cn(s.block, layout === BANNER_LAYOUT.HEADER && s.blockActive)}>
            <h4 className={s.communityTitle}>{title}</h4>
            <div className={cn(s.bar, 'left-28 top-5')} />
            <div className={cn(s.circle, 'right-5 top-5')} />
            <div className={cn(s.hDivider, 'mt-1.5 mb-5')} />

            <div className="absolute w-full h-6 left-4 top-14">
              <div className={cn(s.bar, 'left-0 top-0 w-36')} />
              <div className={cn(s.bar, 'left-0 top-4 h-1 w-28 opacity-30')} />
            </div>

            <div className="absolute w-full h-6 left-4 top-24">
              <div className={cn(s.bar, 'left-0 top-0 w-28')} />
              <div className={cn(s.bar, 'left-0 top-4 h-1 w-24 opacity-30')} />
            </div>

            <div className="absolute w-full h-6 left-4 bottom-14">
              <div className={cn(s.bar, 'left-0 top-0 w-24')} />
              <div className={cn(s.bar, 'left-0 top-4 h-1 w-32 opacity-30')} />
            </div>

            <div className="absolute w-full h-6 left-4 bottom-4">
              <div className={cn(s.bar, 'left-0 top-0 w-32')} />
              <div className={cn(s.bar, 'left-0 top-4 h-1 w-28 opacity-30')} />
            </div>

            <div className={cn(s.vDivider, 'h-3/5 right-20 top-12')} />

            <div className={cn(s.bar, s.primaryBar, 'right-6 top-14 h-1 w-10 h-2.5')} />

            <div className={cn(s.bar, 'right-9 top-24 h-1 w-6 opacity-20')} />
            <div className={cn(s.bar, 'right-5 top-28 h-1 w-10 opacity-20')} />
            <div className={cn(s.bar, 'right-7 top-32 h-1 w-8 opacity-20')} />
            <div className={cn(s.bar, 'right-7 bottom-5 h-1 w-8 opacity-30')} />

            {/* <Main>
              <TagsWrapper>
                <Bar long={100} $color={primaryColor} />
                <Br bottom={15} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
              </TagsWrapper>
            </Main> */}
          </div>
          <CheckLabel title="标题式" active={layout === BANNER_LAYOUT.HEADER} top={4} />
        </div>
        <div className={s.layout} onClick={() => edit(BANNER_LAYOUT.TABBER, 'bannerLayout')}>
          <div className={cn(s.block, layout === BANNER_LAYOUT.TABBER && s.blockActive)}>
            <Row>
              <h4 className={s.communityTitle}>{title}</h4>
              <div className="grow" />
              <Bar thin long={6} />
              <Space right={5} />
              <Circle radius={6} />
            </Row>

            <Br bottom={16} />
            <Row>
              <Bar thin long={10} />
              <Space right={10} />
              <Bar thin long={10} />
              <Space right={10} />
              <Bar thin long={10} />
              <Space right={10} />
              <Bar thin long={10} />
            </Row>
            <DividerLine top={5} bottom={20} />

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
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
              </ListsWrapper>
              <TagsWrapper>
                <Bar long={100} $color={primaryColor} />
                <Br bottom={15} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
              </TagsWrapper>
            </Main>
          </div>
          <CheckLabel title="标签卡式" active={layout === BANNER_LAYOUT.TABBER} top={4} />
        </div>
        <div className={s.layout} onClick={() => edit(BANNER_LAYOUT.SIDEBAR, 'bannerLayout')}>
          <div className={cn(s.block, layout === BANNER_LAYOUT.SIDEBAR && s.blockActive)}>
            <Row>
              <Space right={110} />
              <Bar thin long={10} />
              <div className="grow" />
              <Space right={5} />
              <Bar long={10} $color={primaryColor} />
            </Row>
            <Main>
              <SidebarWrapper>
                <h4 className={s.communityTitle}>{title}</h4>
                <Br bottom={15} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={15} />
                <DividerLine top={6} bottom={12} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
              </SidebarWrapper>
              <Space right={50} />
              <ListsWrapper noBorder>
                <DividerLine top={5} bottom={20} />
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
                <Br bottom={14} />
                <Bar long={40} thin />
                <Br bottom={14} />
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
                <Br bottom={14} />
                <Bar long={40} thin />
                <Br bottom={14} />
              </ListsWrapper>
            </Main>
          </div>
          <CheckLabel title="边栏式" active={layout === BANNER_LAYOUT.SIDEBAR} top={4} />
        </div>
      </div>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.BANNER_LAYOUT}
        loading={saving}
        top={10}
      />
    </div>
  )
}
