import ColorSelector from '~/widgets/ColorSelector'
import ArrowButton from '~/widgets/Buttons/ArrowButton'

import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import { SETTING_FIELD } from '../constant'

import usePrimaryColor from '../logic/usePrimaryColor'
import useSalon from '../styles/layout/primary_color'

export default () => {
  const s = useSalon()
  const { edit, primaryColor, getIsTouched, saving } = usePrimaryColor()
  const isTouched = getIsTouched()

  return (
    <section className={s.wrapper}>
      <SectionLabel
        title="主题色"
        desc={
          <div className="row">
            设置后会在常见组件，功能性文字等位置显示该个性化主题色。参考
            <ArrowButton left={1}>影响范围</ArrowButton>
          </div>
        }
      />
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.PRIMARY_COLOR}
        loading={saving}
        width="90%"
        left={-8}
      >
        <div className={s.label}>
          <ColorSelector
            activeColor={primaryColor}
            onChange={(color) => edit(color, 'primaryColor')}
            placement="right"
            offset={[-1, 15]}
          >
            <div className={s.colorBall} />
          </ColorSelector>
        </div>
      </SavingBar>
    </section>
  )
}
