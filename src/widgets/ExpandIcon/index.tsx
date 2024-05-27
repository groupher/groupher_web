/*
 *
 * ExpandIcon
 *
 */

import { type FC, memo, useState, type ReactNode } from 'react'

import type { TSizeSM } from '@/spec'

import { isString } from '@/validator'
import SIZE from '@/const/size'

import Tooltip from '@/widgets/Tooltip'

import { Wrapper, Icon, Text } from './styles'

type TProps = {
  content: ReactNode
  text: string
  icon?: ReactNode | string
  hideOnClick?: boolean
  hideTextOnInit?: boolean
  size?: TSizeSM
  type?: 'default' | 'green'
}

const ExpandIcon: FC<TProps> = ({
  icon = '',
  text,
  content,
  hideOnClick = false,
  type = 'default',
  size = SIZE.MEDIUM,
  hideTextOnInit = true,
}) => {
  const [active, setActive] = useState(false)

  return (
    <Tooltip
      content={content}
      placement="bottom"
      trigger="click"
      hideOnClick={hideOnClick}
      onHide={() => setActive(false)}
      onShow={() => setActive(true)}
    >
      <Wrapper $testid="ExpandIcon" active={active} hideTextOnInit={hideTextOnInit}>
        {isString(icon) ? (
          <Icon src={icon as string} active={active} type={type} size={size} />
        ) : (
          <span>{icon}</span>
        )}
        <Text active={active} type={type} size={size} hideTextOnInit={hideTextOnInit}>
          {text}
        </Text>
      </Wrapper>
    </Tooltip>
  )
}

export default memo(ExpandIcon)
