import type { FC } from 'react'

import StarSVG from '~/icons/github/Star'
import ForkSVG from '~/icons/github/Fork'

import useSalon, { cn } from '../styles/tech_stacks/repo_preview'

type TProps = {
  name: string
  desc: string
}

const RepoPreview: FC<TProps> = ({ name, desc }) => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div className={s.repo}>
        <div className={s.header}>
          groupher/<div className={s.repoName}>{name}</div>
        </div>

        <div className={s.repoDesc}>{desc}</div>

        <div className={s.footer}>
          <div className={s.info}>
            <StarSVG className={s.icon} />3
          </div>
          <div className={s.info}>
            <ForkSVG className={s.icon} />1
          </div>
        </div>
      </div>

      <div className={s.langBar}>
        <div className={cn(s.bar, s.bgPurple, 'w-28 rounded-l-md')} />
        <div className={cn(s.bar, s.bgBlue, 'w-32')} />
        <div className={cn(s.bar, s.bgYellow, 'w-5 rounded-r-md')} />
      </div>
    </div>
  )
}

export default RepoPreview
