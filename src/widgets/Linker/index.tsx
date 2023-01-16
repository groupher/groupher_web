/*
 *
 * Linker
 *
 */

import { FC, memo } from 'react'

import type { TSpace } from '@/spec'

import { buildLog } from '@/utils/logger'
import { cutRest } from '@/utils/fmt'

import Tooltip from '@/widgets/Tooltip'

import { Wrapper, LinkIcon, LinkOutIcon, Source, PopHint } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:Linker:index')

type TProps = TSpace & {
  testid?: string
  src: string
  text?: string
  // link to external or some domain
  external?: boolean
  openInNewTab?: boolean
  inline?: boolean
  plainColor?: boolean
  maxLength?: number
}

const Linker: FC<TProps> = ({
  testid = 'linker',
  src,
  text = '',
  external = true,
  openInNewTab = false,
  inline = false,
  plainColor = false,
  maxLength = 25,
  ...restProps
}) => {
  const displayLimit = maxLength
  if (!src) return null

  return (
    <Wrapper testid={testid} inline={inline} {...restProps}>
      {external ? <LinkOutIcon /> : <LinkIcon />}
      {src.length < displayLimit ? (
        <Source href={src} target="_blank" plainColor={plainColor}>
          {cutRest(src, displayLimit + 3)}
        </Source>
      ) : (
        <Source href={src} target="_blank" plainColor={plainColor}>
          <Tooltip
            content={<PopHint>{src}</PopHint>}
            placement="bottom"
            hideOnClick={false}
            noPadding
          >
            {cutRest(src, displayLimit + 3)}
          </Tooltip>
        </Source>
      )}
    </Wrapper>
  )
}

export default memo(Linker)
