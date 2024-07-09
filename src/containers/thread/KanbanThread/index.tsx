/* *
 * KanbanThread
 *
 */

import useLayout from '~/hooks/useLayout'
import { KANBAN_LAYOUT } from '~/const/layout'

import WaterfallLayout from './WaterfallLayout'
import ClassicLayout from './ClassicLayout'

import { Wrapper } from './styles'

export default () => {
  const { kanbanLayout } = useLayout()

  return (
    <Wrapper>
      {kanbanLayout === KANBAN_LAYOUT.WATERFALL ? <WaterfallLayout /> : <ClassicLayout />}
    </Wrapper>
  )
}
