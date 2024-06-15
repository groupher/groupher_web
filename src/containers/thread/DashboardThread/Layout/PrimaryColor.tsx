import { Row } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import { SETTING_FIELD } from '../constant'

import usePrimaryColor from '../logic/usePrimaryColor'
import { Wrapper, Label, ColorBall } from '../styles/layout/primary_color'

export default () => {
  const { edit, primaryColor, getIsTouched, saving } = usePrimaryColor()
  const isTouched = getIsTouched()

  return (
    <Wrapper>
      <SectionLabel
        title="主题色"
        desc={
          <Row>
            设置后会在常见组件，功能性文字等位置显示该个性化主题色。参考
            <ArrowButton left={1}>影响范围</ArrowButton>
          </Row>
        }
      />
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.PRIMARY_COLOR}
        loading={saving}
        width="90%"
        left={-8}
      >
        <Label $color={primaryColor}>
          <ColorSelector
            activeColor={primaryColor}
            onChange={(color) => edit(color, 'primaryColor')}
            placement="right"
            offset={[-1, 15]}
          >
            <ColorBall $color={primaryColor} />
          </ColorSelector>
        </Label>
      </SavingBar>
    </Wrapper>
  )
}
