import { FC } from 'react'

import { Wrapper, Cover, Box, UpvoteIcon } from './styles/groupher_log'

const GroupherLogo: FC = () => {
  return (
    <Wrapper>
      <Cover />
      <Box>
        <UpvoteIcon />
      </Box>
    </Wrapper>
  )
}

export default GroupherLogo
