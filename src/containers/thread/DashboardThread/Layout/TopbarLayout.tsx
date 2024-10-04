import { TOPBAR_LAYOUT, DASHBOARD_DESC_LAYOUT } from '~/const/layout'
import { callDashboardDesc } from '~/signal'

import { Br, Inline } from '~/widgets/Common'
import ColorSelector from '~/widgets/ColorSelector'
import ArrowButton from '~/widgets/Buttons/ArrowButton'
import CheckLabel from '~/widgets/CheckLabel'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import useTopbar from '../logic/useTopbar'
import useSalon, { cn } from '../salon/layout/topbar_layout'

export default () => {
  const s = useSalon()

  const { edit, layout, getIsBgTouched, getIsLayoutTouched, saving, bg } = useTopbar()

  const isLayoutTouched = getIsLayoutTouched()
  const isBgTouched = getIsBgTouched()

  return (
    <div className={s.wrapper}>
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
      <div className={s.select}>
        <div className={s.layout} onClick={() => edit(TOPBAR_LAYOUT.YES, 'topbarLayout')}>
          <div className={cn(s.block, layout === TOPBAR_LAYOUT.YES && s.blockActive)}>
            <div className={s.topBar} />
            <div className={cn(s.bar, 'top-8 left-5 h-28 w-6/12 opacity-5')} />
            <div className={cn(s.bar, 'top-8 right-5 h-24 w-20 opacity-5')} />
          </div>
          <CheckLabel title="有 Topbar" active={layout === TOPBAR_LAYOUT.YES} top={4} />
        </div>
        <div className={s.layout} onClick={() => edit(TOPBAR_LAYOUT.NO, 'topbarLayout')}>
          <div className={cn(s.block, layout === TOPBAR_LAYOUT.NO && s.blockActive)}>
            <div className={cn(s.bar, 'top-8 left-5 h-28 w-6/12 opacity-5')} />
            <div className={cn(s.bar, 'top-8 right-5 h-24 w-20 opacity-5')} />
          </div>
          <CheckLabel title="无 Topbar" active={layout === TOPBAR_LAYOUT.NO} top={4} />
        </div>
      </div>

      <SavingBar
        isTouched={isLayoutTouched}
        field={SETTING_FIELD.TOPBAR_LAYOUT}
        loading={saving}
        top={10}
      />

      <Br top={30} />
      {layout === TOPBAR_LAYOUT.YES && (
        <>
          <SavingBar
            isTouched={isBgTouched}
            field={SETTING_FIELD.TOPBAR_BG}
            loading={saving}
            left={-10}
            top={30}
            width="89%"
          >
            <div className={s.bgWrapper}>
              <div>颜色:</div>
              <div className={s.bgLabel}>
                <ColorSelector
                  activeColor={bg}
                  onChange={(color) => edit(color, 'topbarBg')}
                  placement="right"
                  offset={[-1, 15]}
                >
                  <div className={s.theColor} />
                </ColorSelector>
              </div>
            </div>
          </SavingBar>
        </>
      )}
    </div>
  )
}
