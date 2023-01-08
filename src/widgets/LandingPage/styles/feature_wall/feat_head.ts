import styled from 'styled-components'

import { theme } from '@/utils/css'

// import type { TActive, TTestable } from '@/spec'
import type { TFeatType } from '../../spec'
import { FEAT } from '../../constant'

export const Title = styled.div<{ featType: TFeatType }>`
  color: ${({ featType }) => FEAT[featType].COLOR};
  font-size: 26px;
  font-weight: 600;
`
export const Desc = styled.div`
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
`
