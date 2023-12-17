/*
 *
 * Modal
 *
 */

import { FC, ReactNode, useCallback, memo } from 'react'
import dynamic from 'next/dynamic'

import { buildLog } from '@/logger'
import useShortcut from '@/hooks/useShortcut'

const _log = buildLog('w:Modal:index')

export const RealModal = dynamic(() => import('./RealModal'))

export type TProps = {
  children: ReactNode
  show?: boolean
  width?: string
  showCloseBtn?: boolean
  mode?: 'default' | 'error'
  background?: 'default' | 'preview'
  offsetTop?: string
  offsetLeft?: string
  onClose?: () => void
}

const Modal: FC<TProps> = ({ show = false, onClose = log, ...restProps }) => {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useShortcut('Escape', handleClose)

  return <>{show && <RealModal {...restProps} handleCloseModal={handleClose} show={show} />}</>
}

export default memo(Modal)
