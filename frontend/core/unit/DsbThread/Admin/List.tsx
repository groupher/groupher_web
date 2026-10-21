import { callPassportEditor } from '~/signal'
import Pagi from '~/ui/Pagi'
import PaginationError from '~/ui/Pagi/PaginationError'

import useAdmins from '../logic/useAdmins'
import useSalon from './salon/list'
import UserItem from './UserItem'

export default function List() {
  const s = useSalon()
  const {
    moderators,
    activeModerator,
    setActiveSettingAdmin,
    pageInfo,
    setPage,
    loading,
    error,
    retry,
  } = useAdmins()

  return (
    <div className={s.wrapper}>
      {loading && <p role='status'>加载中...</p>}
      {error && <PaginationError isRetrying={loading} onRetry={() => void retry()} />}
      {moderators.flatMap((item) => {
        const { user } = item
        if (!user?.login) return []

        const active = user.login === activeModerator?.login

        return [
          <UserItem
            key={user.login}
            item={item}
            active={active}
            onOpen={(targetUser) => {
              setActiveSettingAdmin(targetUser)
              callPassportEditor()
            }}
          />,
        ]
      })}
      <Pagi pageInfo={pageInfo} onChange={setPage} />
    </div>
  )
}
