import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import { Brick } from '@/widgets/Common'

import {
  Codes,
  TerminalIcon,
  BlickCursor,
  Highlight,
} from '../../styles/feature_wall/integration/embed_script'

const EmbedScript: FC = () => {
  return (
    <>
      <Brick
        $width={215}
        $height={20}
        $radius={4}
        $opacity={0.1}
        bottom={10}
        left={18}
        $color={COLOR_NAME.ORANGE}
      />

      <TerminalIcon />
      <BlickCursor bottom={14} right={29} />

      <Codes bottom={12} left={40}>
        script: groupher/<Highlight $color={COLOR_NAME.BLACK}>embed</Highlight>?id=
        <Highlight $color={COLOR_NAME.RED}>your-site</Highlight>
      </Codes>
    </>
  )
}

export default EmbedScript
