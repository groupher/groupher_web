/*
 *
 * SocialEditor
 *
 */

import { type FC, memo, useState, useCallback, useEffect, Fragment } from 'react'
import { keys, includes, reject, findIndex, update } from 'ramda'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TSocialType, TSocialItem, TSpace } from '~/spec'
import { SOCIAL_LIST } from '~/const/social'

import { Br } from '~/widgets/Common'

import InputBar from './InputBar'

import {
  Wrapper,
  Hint,
  PlatformWrapper,
  IconItemWrapper,
  InputsWrapper,
  Label,
  Icon,
} from './styles'

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
  onChange = console.log,
  value = [],
  ...restProps
}) => {
  const [parent] = useAutoAnimate()

  const [selected, setSelected] = useState<TSocialItem[]>([{ type: SOCIAL_LIST.EMAIL, link: '' }])

  useEffect(() => {
    setSelected(value)
  }, [value])

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
    <Wrapper $testid={testid} width={width} {...restProps}>
      {withTitle && <Label>社交平台账号</Label>}
      <Br top={18} />
      <Hint>点击选择社交平台，相关信息会展示在页脚以及社区关于页面。</Hint>

      <PlatformWrapper>
        {keys(SOCIAL_LIST).map((social: TSocialType) => {
          const SocialIcon = Icon[social]
          const selectedTypes = selected.map((s) => s.type)
          const $active = includes(social, selectedTypes)

          return (
            <IconItemWrapper key={social} $active={$active}>
              <SocialIcon
                $active={$active}
                onClick={() => {
                  if (!includes(social, selectedTypes)) {
                    setSelected([...selected, { type: social, link: '' }])
                  }
                }}
              />
            </IconItemWrapper>
          )
        })}
      </PlatformWrapper>

      <InputsWrapper ref={parent}>
        {selected.map((item: TSocialItem) => (
          <Fragment key={item.type}>
            <InputBar social={item} onDelete={removeSocial} onChange={updateSocial} />
            {item.type === 'GITHUB' && (
              <Hint>填写 Github 仓库地址后，会在页首右侧显示仓库实时 Stars 信息</Hint>
            )}
          </Fragment>
        ))}
      </InputsWrapper>
    </Wrapper>
  )
}

export default memo(SocialEditor)
