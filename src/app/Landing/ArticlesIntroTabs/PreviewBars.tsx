import type { FC } from 'react'

import type { TColor, TThread } from '@/spec'
import { THREAD } from '@/const/thread'

import { Row, Column, TreeColumn, DocColumn, Bar } from '../styles/articles_intro_tabs/preview_bars'

type TProps = {
  tab: TThread
} & TColor

const PreviewBars: FC<TProps> = ({ tab, $color }) => {
  switch (tab) {
    case THREAD.KANBAN: {
      return (
        <Row>
          <Column>
            <Bar $color={$color} width={68} height={3} top={6} />
            <Bar top={13} width={65} $color={$color} height={3} />
            <Bar top={20} $color={$color} width={69} height={3} />
            <Bar top={28} $color={$color} width={45} height={3} />
          </Column>

          <Column right={5}>
            <Bar $color={$color} width={38} height={3} top={6} />
            <Bar top={13} width={75} $color={$color} height={3} />
            <Bar top={19} $color={$color} width={32} height={3} />
            <Bar top={26} $color={$color} width={45} height={3} />
          </Column>
        </Row>
      )
    }

    case THREAD.CHANGELOG: {
      return (
        <>
          <Bar $color={$color} height={3} />
          <Bar top={11} width={75} height={14} $color={$color} $radius={3} />
          <Bar top={29} width={30} height={3} $color={$color} />
        </>
      )
    }

    case THREAD.DOC: {
      return (
        <Row>
          <TreeColumn left={0}>
            <Bar $color={$color} width={80} height={3} top={6} />
            <Bar top={14} width={80} $color={$color} height={3} />
            <Bar top={21} $color={$color} width={80} height={3} />
            <Bar top={28} $color={$color} width={80} height={3} />
          </TreeColumn>

          <DocColumn left={2}>
            <Bar $color={$color} width={38} height={3} top={6} />
            <Bar top={14} width={75} $color={$color} height={3} />
            <Bar top={21} $color={$color} width={32} height={3} />
            <Bar top={28} $color={$color} width={45} height={3} />
          </DocColumn>
        </Row>
      )
    }

    default: {
      return (
        <>
          <Bar $color={$color} />
          <Bar top={13} width={75} $color={$color} />
          <Bar top={21} $color={$color} />
          <Bar top={29} width={30} $color={$color} />
        </>
      )
    }
  }
}

export default PreviewBars
