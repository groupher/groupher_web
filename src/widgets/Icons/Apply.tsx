import { memo, type SVGProps } from 'react'

const Apply = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="prefix__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M722 64c68.892 0 124.87 55.29 125.983 123.916L848 190v154.668c22.862 1.023 45.427 10.174 62.994 27.455l.57.566 19.092 19.092c37.116 37.115 37.487 97.06 1.114 134.633l-1.114 1.131L848 610.201V834c0 68.892-55.29 124.87-123.916 125.983L722 960H221c-68.892 0-124.87-55.29-125.983-123.916L95 834V190c0-68.892 55.29-124.87 123.916-125.983L221 64h501zm0 72H221c-29.525 0-53.516 23.696-53.993 53.107L167 190v644c0 29.525 23.696 53.516 53.107 54H722c29.525 0 53.516-23.696 53.993-53.107L776 834V682.2l-88.938 88.94a96 96 0 01-67.119 28.115l-.763.003h-49.092c-36.087 0-65.409-28.962-65.991-64.909l-.01-1.091v-49.092a96 96 0 0127.58-67.34l.538-.542L776 372.49V190c0-29.525-23.696-53.516-53.107-54H722zm105.003 287.314l-.291.287-243.595 243.594a24 24 0 00-7.025 16.517l-.004.454v43.092h43.092a24 24 0 0016.308-6.393l.338-.319.324-.318 243.595-243.594c9.276-9.276 9.371-24.256.287-33.65l-.287-.291-19.092-19.092c-9.276-9.276-24.256-9.372-33.65-.287zM487 429c19.882 0 36 16.118 36 36 0 19.683-15.797 35.677-35.405 35.995L487 501H290c-19.882 0-36-16.118-36-36 0-19.683 15.797-35.677 35.405-35.995L290 429h197zm164.155-150.155c19.882 0 36 16.118 36 36 0 19.683-15.797 35.677-35.405 35.995l-.595.005h-361c-19.882 0-36-16.118-36-36 0-19.684 15.797-35.677 35.405-35.995l.595-.005h361z" />
    </svg>
  )
}

export default memo(Apply)
