import { FC } from 'react'

import { sortByIndex } from '@/utils/helper'

import type { TMediaReport } from '@/spec'
import AddButton from '@/widgets/Buttons/AddButton'
import { SpaceGrow } from '@/widgets/Common'

import InputBox from './InputBox'

import { Wrapper, Label } from '../../styles/basic_info/other_info/media_editor'
import { addMediaReport } from '../../logic'

type TProps = {
  reports: TMediaReport[]
  queringMediaReportIndex: number | null
}

const MediaEditor: FC<TProps> = ({ reports, queringMediaReportIndex }) => {
  return (
    <Wrapper>
      <Label>
        媒体报道
        <SpaceGrow />
        <AddButton onClick={addMediaReport} dimWhenIdle>
          添加
        </AddButton>
      </Label>
      {/*  @ts-ignore */}
      {sortByIndex(reports).map((item: TMediaReport) => (
        <InputBox key={item.index} item={item} queringMediaReportIndex={queringMediaReportIndex} />
      ))}
    </Wrapper>
  )
}

export default MediaEditor
