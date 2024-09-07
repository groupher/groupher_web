import { type FC, memo, type ReactNode } from 'react'

import type { TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'
import YesOrNoButtons from '~/widgets/Buttons/YesOrNoButtons'

import type { TSettingField } from './spec.d'
import InfoSVG from '~/icons/Save'
import useSalon, { cn } from './styles/saving_bar'

import useHelper from './logic/useHelper'

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
  onCancel = console.log,
  onConfirm = console.log,
  width = '100%',
  ...spacing
}) => {
  const { global } = useTwBelt()
  const s = useSalon({ minimal, width, ...spacing })
  const { rollbackEdit, onSave } = useHelper()

  // cannot pass minimal to Wrapper, cuz the wired issue on styled-components@6
  // const Wrapper = !minimal ? NormalWrapper : MinimalWrapper

  // direction="left"
  // direction="right"

  if (children !== null) {
    if (isTouched) {
      return (
        <div className={cn(s.wrapper, global('saving-bar-left-linear'))}>
          {children}
          <div className="grow" />
          <div className={s.actions}>
            <YesOrNoButtons
              cancelText="取消"
              confirmText="确定"
              disabled={disabled}
              loading={loading}
              space={!loading ? 2.5 : 0}
              onCancel={() => {
                onCancel?.()
                field && rollbackEdit(field)
              }}
              onConfirm={() => {
                if (field) {
                  onSave(field)
                  setTimeout(() => onConfirm?.(), 500)
                } else {
                  onConfirm?.()
                }
              }}
            />
          </div>
        </div>
      )
    }
    return <>{children}</>
  }

  if (!isTouched) return null

  return (
    <div className={cn(s.wrapper, 'pl-2.5', global('saving-bar-right-linear'))}>
      <div className="row-center">
        <InfoSVG className={s.infoIcon} />
        <div className={s.hintText}>
          {prefix}
          {hint && <div className={s.hint}>{hint}</div>} ?
        </div>
      </div>
      <div className="grow" />
      <div className={s.actions}>
        <YesOrNoButtons
          cancelText="取消"
          disabled={disabled}
          confirmText="确定"
          space={!loading ? 2.5 : 0}
          onConfirm={() => {
            if (field) {
              onSave(field)
              setTimeout(() => onConfirm?.(), 500)
            } else {
              onConfirm?.()
            }
          }}
          onCancel={() => {
            onCancel?.()
            field && rollbackEdit(field)
          }}
        />
      </div>
    </div>
  )
}

export default memo(SavingBar)
