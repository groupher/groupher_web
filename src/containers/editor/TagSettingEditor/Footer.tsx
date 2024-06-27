import { CHANGE_MODE } from '@/const/mode'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import useLogic from './useLogic'
import { Wrapper, UpdateWrapper, ActionButton } from './styles/footer'

export default () => {
  const { mode, editingTag, onCreate, onUpdate, onDelete, processing } = useLogic()

  if (processing) {
    return (
      <Wrapper>
        <LavaLampLoading />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {mode === CHANGE_MODE.CREATE ? (
        <ActionButton top={15} onClick={() => onCreate()}>
          创建新标签
        </ActionButton>
      ) : (
        <UpdateWrapper>
          <ActionButton bottom={8} onClick={() => onUpdate()}>
            更新链接
          </ActionButton>

          <ActionButton type="red" onClick={() => onDelete(editingTag)} ghost noBorder>
            删除标签
          </ActionButton>
        </UpdateWrapper>
      )}
    </Wrapper>
  )
}
