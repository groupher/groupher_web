import type { FC } from 'react'

const SvgComponent: FC = (props) => (
  <svg className="prefix__icon" viewBox="0 0 1024 1024" width={200} height={200} {...props}>
    <defs>
      <style />
    </defs>
    <path d="M506.6 351.2l25.6 14.8c7.1 4.1 16.2 1.7 20.3-5.4l148.2-255.9c4.1-7.1 1.7-16.1-5.4-20.2l-25.6-14.8c-7.1-4.1-16.1-1.7-20.3 5.4l-148.2 256c-4.1 7-1.7 16.1 5.4 20.1zm251.2-108.9l-32 55.2c88.7 85.8 128.1 183.5 90.2 249-52.1 90.1-230.6 84.8-398.5-11.9S155.8 286.5 208 196.4c40.9-70.7 159.8-82.4 290.2-37.5l31.8-55C366.2 45.3 209.8 66 152.7 164.6 86.2 279.5 179 458.1 360.8 573.4L160.4 919.7c-4.1 7.1-1.7 16.1 5.4 20.2l25.6 14.8c4.6 2.7 9.7 1.7 14-.7 2.7.9 5.6 1.5 8.7 1.5H795c11.5 0 20.7-6.6 20.7-14.8v-29.6c0-8.2-9.3-14.8-20.7-14.8H242.3l169.9-293.4c191 99.3 392.6 90.3 459.1-24.6 53.7-92.7 3.4-227-113.5-336z" />
  </svg>
)

export default SvgComponent
