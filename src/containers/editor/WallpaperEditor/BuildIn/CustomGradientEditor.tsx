import { useState } from 'react'

import { SpaceGrow, Row } from '~/widgets/Common'
import Button from '~/widgets/Buttons/Button'

import useLogic from '../useLogic'
import {
  Wrapper,
  Label,
  Inputer,
  Footer,
  NoteText,
} from '../styles/build_in/custom_gradient_editor'

export default () => {
  const { getWallpaper, confirmCustomColor } = useLogic()
  const { customColor } = getWallpaper()

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
        <Row>
          <NoteText>支持多组 HEX 颜色值，</NoteText>
        </Row>

        <SpaceGrow />
        {changed && (
          <>
            <Button ghost size="small" noBorder right={8} onClick={() => setColorVal(customColor)}>
              取消
            </Button>

            <Button
              disabled={!changed}
              size="small"
              space={10}
              onClick={() => confirmCustomColor(colorVal)}
            >
              确定
            </Button>
          </>
        )}
      </Footer>
    </Wrapper>
  )
}
