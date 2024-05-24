import { FC, memo, ReactNode } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import { SpaceGrow } from '@/widgets/Common'
import YesOrNoButtons from '@/widgets/Buttons/YesOrNoButtons'

import type { TSettingField } from './spec.d'
import {
  NormalWrapper,
  MinimalWrapper,
  HintWrapper,
  InfoIcon,
  HintText,
  Hint,
  ActionWrapper,
} from './styles/saving_bar'

import { onSave } from './logic'
import useHelper from './logic/useHelper'

const log = buildLog('C:Dashboard/SavingBar')

type TProps = {
  field?: TSettingField | null
  prefix?: string
  hint?: ReactNode
  children?: ReactNode
  loading?: boolean
  isTouched?: boolean
  minimal?: boolean
  disabled?: boolean
  width?: string
  onCancel?: () => void
  onConfirm?: () => void
} & TSpace

const SavingBar: FC<TProps> = ({
  field = null,
  prefix = '是否保存',
  hint = null,
  children = null,
  isTouched = false,
  loading = false,
  minimal = false,
  disabled = false,
  onCancel = log,
  onConfirm = log,
  width = '100%',
  ...restProps
}) => {
  const { rollbackEdit } = useHelper()

  // cannot pass minimal to Wrapper, cuz the wired issue on styled-components@6
  const Wrapper = !minimal ? NormalWrapper : MinimalWrapper

  if (children !== null) {
    if (isTouched) {
      return (
        <Wrapper direction="left" width={width} {...restProps}>
          {children}
          <SpaceGrow />
          <ActionWrapper $minimal={minimal}>
            <YesOrNoButtons
              cancelText="取消"
              confirmText="确定"
              disabled={disabled}
              loading={loading}
              space={4}
              onCancel={() => {
                onCancel?.()
                field && rollbackEdit(field)
              }}
              onConfirm={() => {
                if (field) {
                  onSave(field)
                  setTimeout(() => onConfirm?.(), 1000)
                } else {
                  onConfirm?.()
                }
              }}
            />
          </ActionWrapper>
        </Wrapper>
      )
    }
    return <>{children}</>
  }

  if (!isTouched) return null

  return (
    <Wrapper direction="right" width={width} {...restProps}>
      <HintWrapper>
        <InfoIcon $minimal={minimal} />
        <HintText $minimal={minimal}>
          {prefix}
          {hint && <Hint>{hint}</Hint>} ?
        </HintText>
      </HintWrapper>
      <SpaceGrow />
      <ActionWrapper $minimal={minimal}>
        <YesOrNoButtons
          cancelText="取消"
          disabled={disabled}
          confirmText="确定"
          loading={loading}
          space={4}
          onConfirm={() => {
            if (field) {
              onSave(field)
              setTimeout(() => onConfirm?.(), 1000)
            } else {
              onConfirm?.()
            }
          }}
          onCancel={() => {
            onCancel?.()
            field && rollbackEdit(field)
          }}
        />
      </ActionWrapper>
    </Wrapper>
  )
}

export default memo(SavingBar)
