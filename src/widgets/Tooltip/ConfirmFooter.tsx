import type { FC } from 'react'

import Button from '~/widgets/Buttons/Button'
import { Space } from '~/widgets/Common'

import { FOOTER_BEHAVIOR } from './constant'

import useSalon from './salon/confirm_footer'

type TProps = {
  behavior?: 'default' | 'confirm' | 'delete-confirm' | 'add'

  onConfirm?: () => void
  onCancel?: () => void
}

const ConfirmFooter: FC<TProps> = ({ onConfirm, onCancel, behavior }) => {
  const s = useSalon()
  let content = null

  switch (behavior) {
    case FOOTER_BEHAVIOR.DELETE_CONFIRM: {
      content = (
        <div className={s.bottomWrapper}>
          <button className={s.cancelBtn} onClick={onCancel}>
            取消
          </button>
          <Space right={10} />
          <Button size="tiny" type="red" onClick={() => onConfirm?.()}>
            确定
          </Button>
        </div>
      )
      break
    }

    case FOOTER_BEHAVIOR.ADD: {
      content = (
        <div className={s.bottomWrapper}>
          <Button size="small" type="primary" onClick={() => onConfirm?.()}>
            添加
          </Button>
          <Space right={10} />
          <button className={s.cancelBtn} onClick={() => onCancel?.()}>
            取消
          </button>
        </div>
      )
      break
    }

    default: {
      content = (
        <div className={s.bottomWrapper}>
          <Button size="small" type="primary" onClick={onConfirm}>
            确定
          </Button>
          <Space right={10} />
          <button className={s.cancelBtn} onClick={() => onCancel?.()}>
            取消
          </button>
        </div>
      )
      break
    }
  }

  return <div className={s.wrapper}>{content}</div>
}

export default ConfirmFooter
