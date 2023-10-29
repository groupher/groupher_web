import { FC } from 'react'

import Footer from './Footer'

type TProps = {
  onBack: () => void
}

const TagSetting: FC<TProps> = ({ onBack }) => {
  return (
    <div>
      <div>TagSetting</div>

      <Footer
        onBack={onBack}
        onConfirm={() => console.log('## title confirm')}
        top={20}
        bottom={5}
      />
    </div>
  )
}

export default TagSetting
