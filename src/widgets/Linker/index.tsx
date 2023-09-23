/*
 *
 * Linker
 *
 */

import { FC, memo } from 'react'

import type { TSpace } from '@/spec'

import { buildLog } from '@/logger'

import { prettyURL } from '@/fmt'
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
  inline?: boolean
  plainColor?: boolean
}

const Linker: FC<TProps> = ({
  testid = 'linker',
  src,
  text = '',
  external = true,
  inline = false,
  plainColor = false,
  ...restProps
}) => {
  if (!src) return null

  return (
    <Wrapper testid={testid} inline={inline} {...restProps}>
      <LinkIcon />
      {/* {!external ? <LinkOutIcon /> : <LinkIcon />} */}
      <Tooltip
        content={<PopHint>{src}</PopHint>}
        placement="bottom"
        hideOnClick={false}
        delay={300}
        offset={[-10, 0] as [number, number]}
        noPadding
      >
        <Source href={src} target="_blank" plainColor={plainColor}>
          {prettyURL(src)}
        </Source>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(Linker)
