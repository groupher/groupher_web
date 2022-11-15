import { FC, memo } from 'react'

// import MoreLink from './MoreLink'
import { Wrapper, DotDivider } from '../styles/main_entries'

const splitMargin = 12

const DesktopView: FC = () => {
  return (
    <Wrapper>
      <DotDivider space={splitMargin} />
      {/* <DotDivider space={splitMargin} />
      <MoreLink /> */}
    </Wrapper>
  )
}

export default memo(DesktopView)
