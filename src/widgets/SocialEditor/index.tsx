/*
 *
 * SocialEditor
 *
 */

import { FC, memo, useState, useCallback } from 'react'
import { keys, includes, reject } from 'ramda'

import type { TSocialType, TSocialItem, TSpace } from '@/spec'
import { SOCIAL_LIST } from '@/constant/social'
import { buildLog } from '@/utils/logger'

import InputBar from './InputBar'

import { Wrapper, Hint, PlatformWrapper, InputsWrapper, Label, Icon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:SocialEditor:index')

type TProps = {
  testid?: string
  width?: string
  withTitle?: boolean
} & TSpace

const SocialEditor: FC<TProps> = ({
  testid = 'social-editor',
  width = '310px',
  withTitle = true,
  ...restProps
}) => {
  const [selected, setSelected] = useState<TSocialItem[]>([
    { type: SOCIAL_LIST.HOMEPAGE, addr: 'https://groupher.com' },
  ])

  const remove = useCallback(
    (social: TSocialItem) => {
      // @ts-ignore
      const after: TSocialItem[] = reject(
        (item: TSocialItem) => item.type === social.type,
        selected,
      )
      setSelected(after)
    },
    [selected],
  )

  return (
    <Wrapper testid={testid} width={width} {...restProps}>
      {withTitle && <Label>更新社交账号</Label>}
      <Hint>点击选择社交平台:</Hint>
      <PlatformWrapper>
        {keys(SOCIAL_LIST).map((social: TSocialType) => {
          const SocialIcon = Icon[social]
          const selectedTypes = selected.map((s) => s.type)

          return (
            <SocialIcon
              key={social}
              $active={includes(social, selectedTypes)}
              onClick={() => {
                if (!includes(social, selectedTypes)) {
                  setSelected([...selected, { type: social, addr: '' }])
                }
              }}
            />
          )
        })}
      </PlatformWrapper>

      <InputsWrapper>
        {selected.map((item: TSocialItem) => (
          <InputBar key={item.type} social={item} onDelete={(social) => remove(social)} />
        ))}
      </InputsWrapper>
    </Wrapper>
  )
}

export default memo(SocialEditor)
