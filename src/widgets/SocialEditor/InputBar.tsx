/*
 *
 * SocialEditor
 *
 */

import { FC, memo } from 'react'

import type { TSocialType } from '@/spec'

import { buildLog } from '@/utils/logger'
import { Trans } from '@/utils/i18n'

import { Wrapper, IconWrapper, DeleteWrapper, DeleteIcon, Inputer, Icon } from './styles/input_bar'

/* eslint-disable-next-line */
const log = buildLog('w:SocialEditor:index')

type TProps = {
  social: TSocialType
  onDelete: (social: TSocialType) => void
}

const InputBar: FC<TProps> = ({ social, onDelete }) => {
  const SocalIcon = Icon[social.toLowerCase()]

  return (
    <Wrapper>
      <IconWrapper>
        <SocalIcon $active />
      </IconWrapper>
      <Inputer placeholder={Trans(social)} />
      <DeleteWrapper onClick={() => onDelete(social)}>
        <DeleteIcon />
      </DeleteWrapper>
    </Wrapper>
  )
}

export default memo(InputBar)
