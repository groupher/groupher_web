import { LANDING_WALLPAPER } from '../../../../const/wallpaper'
import useSalon from '../../salon/dashboard_intros/layout_tab/wallpaper_card'
import WallpaperBar from './WallpaperBar'

export default function WallpaperCard() {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div
        aria-hidden='true'
        className={`${s.background} theme-light-branch`}
        data-theme-branch='light'
        style={{
          backgroundImage: `url(${LANDING_WALLPAPER.light})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div
        aria-hidden='true'
        className={`${s.background} theme-dark-branch`}
        data-theme-branch='dark'
        style={{
          backgroundImage: `url(${LANDING_WALLPAPER.dark})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className={s.edittool}>
        <WallpaperBar />
      </div>
    </div>
  )
}
