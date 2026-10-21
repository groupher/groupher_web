import type { FC } from 'react'

import ArrowSVG from '~/icons/ArrowSimple'
import type { TGraphQLPagiPageInfo, TSpace } from '~/spec'

import type { TProps as TPagiProps } from '.'
import useSalon, { cn } from './salon'

export type TPagiLabels = { previousPage: string; nextPage: string; pageNumber: string }
const DEFAULT_LABELS: TPagiLabels = {
  previousPage: '上一页',
  nextPage: '下一页',
  pageNumber: '页码',
}

type TProps = Pick<TPagiProps, 'onChange' | 'labels'> & {
  pageInfo: Extract<TGraphQLPagiPageInfo, { __typename: 'OffsetPageInfo' }>
} & TSpace

const RealPagi: FC<TProps> = ({
  pageInfo,
  onChange = () => undefined,
  labels = DEFAULT_LABELS,
  ...spacing
}) => {
  const s = useSalon({ ...spacing })

  const { page: pageNumber, totalPages } = pageInfo
  const leftDisabled = !pageInfo.hasPreviousPage
  const rightDisabled = !pageInfo.hasNextPage
  const changePageFromInput = (value: number): void => {
    if (!Number.isInteger(value) || value < 1 || value > totalPages) return
    onChange(value)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <button
          type='button'
          className={s.arrowBlock}
          aria-label={labels.previousPage}
          disabled={leftDisabled}
          onClick={() => onChange(pageNumber - 1)}
        >
          <ArrowSVG className={cn(s.arrowIcon, pageNumber === 1 && s.arrowDisabled)} />
        </button>

        <div className={s.main}>
          <input
            className={cn(s.numInputer, pageNumber >= 10 ? 'w-9' : 'w-6')}
            type='number'
            min={1}
            max={totalPages}
            value={pageNumber}
            aria-label={labels.pageNumber}
            onChange={(event) => changePageFromInput(event.currentTarget.valueAsNumber)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                changePageFromInput(e.currentTarget.valueAsNumber)
              }
            }}
          />
          <div className={s.slash}>/</div>
          <div className={s.total}>{totalPages}</div>
        </div>
        <button
          type='button'
          className={s.arrowBlock}
          aria-label={labels.nextPage}
          disabled={rightDisabled}
          onClick={() => onChange(pageNumber + 1)}
        >
          <ArrowSVG className={cn(s.arrowIcon, 'rotate-180', rightDisabled && s.arrowDisabled)} />
        </button>
      </div>
    </div>
  )
}

export default RealPagi
