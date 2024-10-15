import StackCard from './StackCard'
import GithubCard from './GithubCard'

import useSalon, { cn } from '../styles/tech_stacks'

export default () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div className={s.slogan}>
        <h3 className={s.title}>代码开源，开放透明</h3>
        <div className={s.desc}>由久经考验的优秀开源技术栈驱动，期待您的共同参与</div>
      </div>
      <div className={s.wall}>
        <div className={s.inner}>
          <div className={s.innerBgWrapper}>
            <img src="/cad-bg.png" className={cn(s.cadBg, 'left-0 w-8/12')} alt="card-bg" />
            <img
              src="/cad-bg.png"
              className={cn(s.cadBg, 'right-0 w-4/12 rotate-180')}
              alt="card-bg"
            />
          </div>
          <StackCard />
          <GithubCard />
        </div>
      </div>
    </div>
  )
}
