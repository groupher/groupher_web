import { COLOR_NAME } from '~/const/colors'

import NodeBlock from './NodeBlock'
import BgShapes from './BgShapes'
import Fans from './Fans'

import SeedSVG from '~/icons/Seed'
import TadaSVG from '~/icons/Tada'

import useSalon from '../../styles/enjoy_dev/our_way'

export default () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <BgShapes />
      <Fans />
      <div className="row-center">
        <SeedSVG className={s.seedIcon} />
        <div className={s.connectLine} />
      </div>

      <NodeBlock index={0} cat="DEFAULT" />
      {/* <MainConnectLine left="120px" top="306px" /> */}
      <NodeBlock cat="FEATURE" className="absolute top-20 left-40" bg={COLOR_NAME.PURPLE} />
      <NodeBlock cat="OTHER" className="absolute bottom-20 left-40" bg={COLOR_NAME.BLUE} />
      <NodeBlock index={1} cat="DEFAULT" />
      {/* <MainConnectLine left="500px" top="306px" /> */}
      <NodeBlock cat="QUESTION" className="absolute bottom-20 right-40" bg={COLOR_NAME.GREEN} />
      <NodeBlock cat="BUG" className="absolute top-20 right-40" bg={COLOR_NAME.RED} />
      <NodeBlock index={2} cat="DEFAULT" />

      <div className="row-center">
        <div className={s.connectLine} />
        <TadaSVG className={s.tadaIcon} />
      </div>
    </div>
  )
}
