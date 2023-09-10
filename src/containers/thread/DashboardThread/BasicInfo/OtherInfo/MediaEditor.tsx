import { FC } from 'react'

import { sortByIndex } from '@/utils/helper'

import AddButton from '@/widgets/Buttons/AddButton'
import { SpaceGrow } from '@/widgets/Common'

import InputBox from './InputBox'

import type { TMediaReport } from '../../spec'
import { Wrapper, Label } from '../../styles/basic_info/other_info/media_editor'
import { addMediaReport } from '../../logic'

type TProps = {
  reports: TMediaReport[]
  queringMediaReportId: number | null
}

const MediaEditor: FC<TProps> = ({ reports, queringMediaReportId }) => {
  return (
    <Wrapper>
      <Label>
        媒体报道
        <SpaceGrow />
        <AddButton dimWhenIdle onClick={() => addMediaReport()}>
          添加
        </AddButton>
      </Label>
      {/*  @ts-ignore */}
      {sortByIndex(reports, 'id').map((item: TMediaReport) => (
        <InputBox key={item.id} item={item} queringMediaReportId={queringMediaReportId} />
      ))}
    </Wrapper>
  )
}

export default MediaEditor
