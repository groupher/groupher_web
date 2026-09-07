import Typewriter from 'typewriter-effect'

import LockSVG from '~/icons/Lock'

import { LANDING_WALLPAPER } from '../../../const/wallpaper'
import useSalon from '../salon/cover_image/desktop_device'
import ImageSlider from './ImageSlider'

export default function DesktopDevice() {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div className={s.brower}>
        <div className={s.dot} />
        <div className={s.dot} />
        <div className={s.dot} />
        <div className='grow' />
        <div className={s.addrBar}>
          <LockSVG className={s.lock} />
          <div className={s.addtext}>https://</div>
          <div className={s.brand}>your-brand</div>
          <div className={s.addtext}>.groupher.com/</div>
          <div className={s.threadText} style={s.threadTextStyle}>
            <Typewriter
              options={{
                strings: ['posts', 'kanban', 'changelog', 'help', 'roadmap', 'docs'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className='grow' />
      </div>
      <div className={s.content}>
        <ImageSlider />
      </div>

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
    </div>
  )
}
