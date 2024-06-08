import { type FC, memo } from 'react'

import Share from '@/widgets/Share'

import { Wrapper } from './styles/share_menu'

const ShareMenu: FC = () => {
  return (
    <Wrapper>
      <Share />
    </Wrapper>
  )
}

export default memo(ShareMenu)
