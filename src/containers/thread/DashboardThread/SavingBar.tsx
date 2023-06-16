import { FC, memo, Fragment, ReactNode } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/utils/logger'

import { SpaceGrow } from '@/widgets/Common'
import YesOrNoButtons from '@/widgets/Buttons/YesOrNoButtons'

import type { TSettingField } from './spec.d'
import { Wrapper, HintWrapper, InfoIcon, HintText, Hint, ActionWrapper } from './styles/saving_bar'

import { rollbackEdit, onSave } from './logic'

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
  ...restProps
}) => {
  if (children !== null) {
    if (isTouched) {
      return (
        <Wrapper gradientDirection="left" minimal={minimal} {...restProps}>
          <Fragment>{children}</Fragment>
          <SpaceGrow />
          <ActionWrapper minimal={minimal}>
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
    return <Fragment>{children}</Fragment>
  }

  if (!isTouched) return null

  return (
    <Wrapper gradientDirection="right" minimal={minimal} {...restProps}>
      <HintWrapper>
        <InfoIcon minimal={minimal} />
        <HintText minimal={minimal}>
          {prefix}
          {hint && <Hint>{hint}</Hint>} ?
        </HintText>
      </HintWrapper>
      <SpaceGrow />
      <ActionWrapper minimal={minimal}>
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
