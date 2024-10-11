import styled from '~/css'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn } = useTwBelt()

  return {
    wrapper: cn('w-full h-full recursive p-4 pt-7'),
  }
}

export const Wrapper = styled.div`
  padding: 15px;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  position: relative;
`
