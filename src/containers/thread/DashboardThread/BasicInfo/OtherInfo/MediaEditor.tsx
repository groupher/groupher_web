import { sortByIndex } from '~/helper'

import type { TMediaReport } from '~/spec'
import AddButton from '~/widgets/Buttons/AddButton'

import InputBox from './InputBox'

import { Wrapper, Label } from '../../styles/basic_info/other_info/media_editor'
import useBaseInfo from '../../logic/useBaseInfo'

export default () => {
  const { addMediaReport, mediaReports, queringMediaReportIndex } = useBaseInfo()

  return (
    <Wrapper>
      <Label>
        媒体报道
        <div className="grow" />
        <AddButton onClick={addMediaReport} top={2} dimWhenIdle>
          添加
        </AddButton>
      </Label>
      {/* @ts-ignore */}
      {sortByIndex(mediaReports).map((item: TMediaReport) => (
        <InputBox key={item.index} item={item} queringMediaReportIndex={queringMediaReportIndex} />
      ))}
    </Wrapper>
  )
}
