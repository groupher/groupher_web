/*
 *
 * SocialEditor
 *
 */

import { FC, memo, useState, useCallback } from 'react'
import { keys, includes, reject } from 'ramda'

import type { TSocialType } from '@/spec'
import { SOCIAL_LIST } from '@/constant'
import { buildLog } from '@/utils/logger'

import InputBar from './InputBar'

import { Wrapper, Hint, PlatformWrapper, InputsWrapper, Label, Icon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:SocialEditor:index')

type TProps = {
  testid?: string
}

const SocialEditor: FC<TProps> = ({ testid = 'social-editor' }) => {
  const [selected, setSelected] = useState([SOCIAL_LIST.HOMEPAGE.toUpperCase()])

  const remove = useCallback(
    (social) => {
      // @ts-ignore
      const after: TSocialType[] = reject((item: TSocialType) => item === social, selected)
      setSelected(after)
    },
    [selected],
  )

  return (
    <Wrapper testid={testid}>
      <Label>更新社交账号</Label>
      <Hint>点击选择社交平台:</Hint>

      <PlatformWrapper>
        {keys(SOCIAL_LIST).map((social) => {
          const SocialIcon = Icon[social.toLowerCase()]

          return (
            <SocialIcon
              key={social}
              $active={includes(social, selected)}
              onClick={() => {
                if (!includes(social, selected)) {
                  setSelected([...selected, social])
                }
              }}
            />
          )
        })}
      </PlatformWrapper>

      <InputsWrapper>
        {selected.map((item: TSocialType) => (
          <InputBar key={item} social={item} onDelete={(social) => remove(social)} />
        ))}
      </InputsWrapper>
    </Wrapper>
  )
}

export default memo(SocialEditor)
