import { mockUsers } from '~/mock'

import DiscussSVG from '~/icons/DiscussSolid'

import Facepile from '~/widgets/Facepile/LandingPage'
import Img from '~/Img'

import useSalon, { cn } from '../../styles/enjoy_dev/fans'

export default () => {
  const s = useSalon()
  const users = mockUsers(10)

  return (
    <div className={s.wrapper}>
      <div className={cn(s.userWrapper, s.borderPurple, 'top-12 left-10')}>
        <Img src={users[4].avatar} className={cn(s.avatar)} />
      </div>

      <div className={cn(s.userWrapper, s.borderGreen, 'top-20 left-52')}>
        <Img src={users[6].avatar} className={cn(s.avatar, 'size-8')} />
      </div>

      <div className={cn(s.userWrapper, s.borderOrange, 'bottom-20 right-32')}>
        <Img src={users[6].avatar} className={cn(s.avatar)} />
      </div>

      <div className={cn(s.userWrapper, s.borderBlue, 'bottom-40 right-52')}>
        <Img src={users[0].avatar} className={cn(s.avatar, 'size-6')} />
      </div>

      <div className={cn(s.commentsGroup, 'top-10 left-80')}>
        <Img src="icons/emotion/confused.png" className={s.emoji} />
        <Facepile users={users.slice(8, 10)} left={2} className="scale-90 gap-x-1" />
      </div>

      <div className={cn(s.commentsGroup, 'top-44 left-64 animate-delay-800')}>
        <DiscussSVG className={s.discussIcon} />
        <Facepile users={users.slice(7, 9)} left={2} className="scale-90 gap-x-1" />
      </div>

      <div className={cn(s.commentsGroup, 'bottom-10 left-40 animate-delay-1000')}>
        <Img src="icons/emotion/biceps.png" className={s.emoji} />
        <Facepile users={users.slice(0, 3)} left={2} className="scale-90 gap-x-1" />
      </div>

      <div className={cn(s.commentsGroup, 'bottom-20 left-80')}>
        <Img src="icons/emotion/heart.png" className={s.emoji} />
        <Facepile users={users.slice(2, 5)} left={2} className="scale-90 gap-x-1" />
      </div>

      <div className={cn(s.commentsGroup, 'top-24 right-40 animate-delay-500')}>
        <Img src="icons/emotion/beer.png" className={s.emoji} />
        <Facepile users={users.slice(3, 6)} left={2} className="scale-90 gap-x-1" />
      </div>
    </div>
  )
}
