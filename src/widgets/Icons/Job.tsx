import type { FC } from 'react'

const SvgComponent: FC = (props) => (
  <svg className="prefix__icon" viewBox="0 0 1024 1024" width={200} height={200} {...props}>
    <defs>
      <style />
    </defs>
    <path d="M926.976 896.896A110.272 110.272 0 0 0 960 819.2V316.352a109.568 109.568 0 0 0-109.952-108.8h-172.16v-58.496A53.504 53.504 0 0 0 624.32 96H398.656a53.376 53.376 0 0 0-53.056 53.12v58.432H172.8A109.632 109.632 0 0 0 64 316.352V819.2a109.888 109.888 0 0 0 32.64 77.568 107.648 107.648 0 0 0 77.312 31.488h675.52a107.328 107.328 0 0 0 77.504-31.36zM426.752 146.368h169.6a30.912 30.912 0 0 1 30.656 30.528v30.656h-230.4v-30.656a30.912 30.912 0 0 1 30.144-30.528zM114.88 316.608a58.624 58.624 0 0 1 58.944-58.496h676.224a58.688 58.688 0 0 1 58.304 58.432v138.368l3.776 3.84h-797.44V316.416zm455.68 224a59.008 59.008 0 1 1-118.016 0v-.576a57.6 57.6 0 0 1 8.32-28.736l.768-1.28h100.032l.768 1.344a57.984 57.984 0 0 1 8.128 29.056zm-396.8 337.024a58.752 58.752 0 0 1-58.368-58.432V510.016H407.68l-.96 3.456a108.16 108.16 0 0 0-3.84 27.2 110.976 110.976 0 0 0 35.264 76.8 108.8 108.8 0 0 0 79.04 29.44 111.232 111.232 0 0 0 105.472-106.688 106.368 106.368 0 0 0-4.736-27.008l-1.088-3.52H908.8V819.2a58.688 58.688 0 0 1-58.944 58.432H173.44z" />
  </svg>
)

export default SvgComponent
