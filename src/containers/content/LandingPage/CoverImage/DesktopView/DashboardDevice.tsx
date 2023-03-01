import { FC } from 'react'

import { Wrapper, Content, Image } from '../../styles/cover_image/desktop_view/dashboard_device'

const DashboardDevice: FC = () => {
  const imageSrc = '/intro/dashboard.png'

  return (
    <Wrapper>
      <Content>
        <Image src={imageSrc} />
      </Content>
    </Wrapper>
  )
}

export default DashboardDevice
