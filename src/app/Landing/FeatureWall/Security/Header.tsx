import type { FC } from 'react'

import { COLOR_NAME } from '~/const/colors'

import { Wrapper, Dot, Domain, MoreIcon } from '../../styles/feature_wall/security/header'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper left={0} top={hovering ? 0 : -30}>
      <Dot left={18} top={16} $color={COLOR_NAME.RED} />
      <Dot left={34} top={16} $color={COLOR_NAME.ORANGE} />
      <Dot left={50} top={16} $color={COLOR_NAME.GREEN_LIGHT} />

      <Domain top={10} left={112}>
        自定义域名
      </Domain>

      <MoreIcon />
    </Wrapper>
  )
}

export default Panel
