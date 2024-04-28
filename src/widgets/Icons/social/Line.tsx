import { memo, SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 100 100" {...props}>
      <g id="SVGRepo_iconCarrier">
        <style>{'.st83{fill:#ffffff}'}</style>
        <g id="Layer_2">
          <path
            d="M96.016 39.744C92.024 8.546 50.272-3.26 25.207 10.963-12.474 32.265 3.399 77.179 42.212 82.329l.52.103c1.223.242 1.552.575 1.637.706.157.245.075.727.012.992-.533 2.241-1.191 4.402-.761 6.908 1.268 6.699 8.309 3.4 11.868 1.069 4.503-2.645 8.746-5.628 11.939-7.931 15.098-10.523 31.03-23.605 28.589-44.432z"
            style={{
              fill: '#00cc76',
            }}
          />
          <path
            d="M32.534 53.849h-7.981a2.184 2.184 0 0 1-2.184-2.184V34.914c.072-2.874 4.293-2.885 4.367 0v14.567h5.796c2.877.07 2.884 4.296.002 4.368zM40.859 51.606c-.071 2.875-4.294 2.884-4.368 0V34.855c.071-2.875 4.294-2.884 4.368 0v16.751zM60.598 51.606c.063 2.049-2.787 2.991-3.951 1.283l-7.863-10.83v9.548c-.069 2.874-4.295 2.884-4.367 0V35.335c-.04-2.069 2.766-2.987 3.951-1.283l7.864 10.83V34.855c.069-2.875 4.295-2.884 4.367 0l-.001 16.751zM76.51 53.446H65.702a2.184 2.184 0 0 1-2.184-2.184c.003-4.175-.002-12.577 0-16.751 0-1.206.978-2.184 2.184-2.184h10.473c2.879.075 2.882 4.293 0 4.367h-8.289v4.008h6.726c2.878.072 2.881 4.295 0 4.367h-6.726v4.008h8.624c2.875.07 2.883 4.297 0 4.369z"
            className="st83"
          />
        </g>
      </g>
    </svg>
  )
}

export default memo(SVG)
