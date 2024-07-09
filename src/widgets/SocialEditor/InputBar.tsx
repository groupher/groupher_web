/*
 *
 * SocialEditor
 *
 */

import { type FC, memo } from 'react'

import type { TSocialItem } from '~/spec'

import { Trans } from '~/i18n'

import { Wrapper, IconWrapper, DeleteWrapper, DeleteIcon, Inputer, Icon } from './styles/input_bar'

type TProps = {
  social: TSocialItem
  onChange: (type: string, value: string) => void
  onDelete: (social: TSocialItem) => void
}

const InputBar: FC<TProps> = ({ social, onDelete, onChange }) => {
  const SocalIcon = Icon[social.type]

  return (
    <Wrapper>
      <IconWrapper>
        <SocalIcon $active />
      </IconWrapper>
      <Inputer
        placeholder={Trans(social.type)}
        value={social.link}
        onChange={(e) => onChange(social.type, e.target.value)}
      />
      <DeleteWrapper onClick={() => onDelete(social)}>
        <DeleteIcon />
      </DeleteWrapper>
    </Wrapper>
  )
}

export default memo(InputBar)
