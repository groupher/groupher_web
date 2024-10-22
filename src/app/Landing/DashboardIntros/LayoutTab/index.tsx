import ContentCard from './ContentCard'
import WallpaperCard from './WallpaperCard'

import useSalon from '../../styles/dashboard_intros/layout_tab'

export default () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <ContentCard />
      <WallpaperCard />
    </div>
  )
}
