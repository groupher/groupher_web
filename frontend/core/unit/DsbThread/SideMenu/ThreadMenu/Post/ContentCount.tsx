import useCommunity from '~/stores/community/hooks'

import MenuItemCount from '../../MenuItemCount'

export default function PostContentCount() {
  const { meta } = useCommunity()

  return <MenuItemCount value={meta?.postsCount ?? 0} />
}
