import { FC } from 'react'

// import ErrorPage from '@/widgets/ErrorPage'
import ThemePalette from '@/containers/layout/ThemePalette'

const Oops: FC = () => {
  return (
    <ThemePalette>
      <div>Oops | 服务器错误</div>
    </ThemePalette>
  )
}

export default Oops
