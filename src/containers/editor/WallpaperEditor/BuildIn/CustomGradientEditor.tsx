import { FC, memo, useState } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import Button from '@/widgets/Buttons/Button'
import {
  Wrapper,
  Label,
  Inputer,
  Footer,
  Note,
  NoteText,
} from '../styles/build_in/custom_gradient_editor'

import { changeCustomColor } from '../logic'

type TProps = {
  customColor: string
}

const CustomGradientEditor: FC<TProps> = ({ customColor }) => {
  const [colorVal, setColorVal] = useState(customColor)
  const changed = colorVal !== customColor

  return (
    <Wrapper>
      <Label>自定义</Label>
      <Inputer
        placeholder="颜色值以, 分隔, 如 #EBDDD1,#CEB2D3,#F16061"
        value={colorVal}
        onChange={(e) => setColorVal(e.target.value)}
      />
      <Footer>
        <>
          <NoteText>支持多组 HEX 颜色值，</NoteText>
          <Note href="/">了解更多</Note>
        </>

        <SpaceGrow />
        {changed && (
          <>
            <Button
              ghost
              size="tiny"
              noBorder
              right={8}
              onClick={() => {
                setColorVal(customColor)
              }}
            >
              取消
            </Button>

            <Button
              disabled={!changed}
              size="tiny"
              space={6}
              onClick={() => changeCustomColor(colorVal)}
            >
              确定
            </Button>
          </>
        )}
      </Footer>
    </Wrapper>
  )
}

export default memo(CustomGradientEditor)
