/*
 *
 * SocialEditor
 *
 */

import { FC, memo, useState, useCallback, useEffect } from 'react'
import { keys, includes, reject, findIndex, update } from 'ramda'

import { useAutoAnimate } from '@formkit/auto-animate/react'

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
  value?: TSocialItem[]
  onChange?: (items: TSocialItem[]) => void
} & TSpace

const SocialEditor: FC<TProps> = ({
  testid = 'social-editor',
  width = '310px',
  withTitle = true,
  onChange = log,
  value = [],
  ...restProps
}) => {
  const [parent] = useAutoAnimate({ duration: 100 })

  const [selected, setSelected] = useState<TSocialItem[]>([
    { type: SOCIAL_LIST.HOMEPAGE, link: '' },
  ])

  useEffect(() => {
    setSelected(value)
  }, [])

  const removeSocial = useCallback(
    (social: TSocialItem) => {
      const after: TSocialItem[] = reject(
        (item: TSocialItem) => item.type === social.type,
        selected,
      )
      setSelected(after)
      onChange(after)
    },
    [selected, onChange],
  )

  const updateSocial = useCallback(
    (type: string, value: string) => {
      const targetIndex = findIndex((item: TSocialItem) => item.type === type, selected)
      const after = update(targetIndex, { type, link: value }, selected)
      setSelected(after as TSocialItem[])
      onChange(after)
    },
    [selected, onChange],
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
                  setSelected([...selected, { type: social, link: '' }])
                }
              }}
            />
          )
        })}
      </PlatformWrapper>

      <InputsWrapper ref={parent}>
        {selected.map((item: TSocialItem) => (
          // @ts-ignore
          <InputBar key={item.type} social={item} onDelete={removeSocial} onChange={updateSocial} />
        ))}
      </InputsWrapper>
    </Wrapper>
  )
}

export default memo(SocialEditor)
