/*
 *
 * SocialEditor
 *
 */

import { FC, memo } from 'react'

import type { TSocialItem } from '@/spec'

import { buildLog } from '@/utils/logger'
import { Trans } from '@/utils/i18n'

import { Wrapper, IconWrapper, DeleteWrapper, DeleteIcon, Inputer, Icon } from './styles/input_bar'

/* eslint-disable-next-line */
const log = buildLog('w:SocialEditor:index')

type TProps = {
  social: TSocialItem
  onDelete: (social: TSocialItem) => void
}

const InputBar: FC<TProps> = ({ social, onDelete }) => {
  const SocalIcon = Icon[social.type]

  return (
    <Wrapper>
      <IconWrapper>
        <SocalIcon $active />
      </IconWrapper>
      <Inputer placeholder={Trans(social.type)} value={social.addr} />
      <DeleteWrapper onClick={() => onDelete(social)}>
        <DeleteIcon />
      </DeleteWrapper>
    </Wrapper>
  )
}

export default memo(InputBar)
