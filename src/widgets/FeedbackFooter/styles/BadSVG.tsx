import { memo, SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <circle cx={18} cy={18} r={18} fill="#FD875A" />
      <path
        fill="#664500"
        d="M22.886 27.485c-1.575 0-2.393-.797-3.049-1.437-.56-.545-.965-.939-1.827-.939-.863 0-1.268.395-1.827.939-.656.64-1.474 1.437-3.048 1.437s-2.39-.797-3.046-1.437c-.557-.544-.96-.937-1.815-.939-.611.002-.97.193-1.32.48a.875.875 0 0 1-1.109-1.353 3.664 3.664 0 0 1 2.405-.877h.049c1.552.012 2.361.801 3.012 1.437.559.546.963.939 1.824.939.863 0 1.268-.395 1.828-.939.656-.64 1.474-1.437 3.048-1.437s2.392.796 3.048 1.437c.561.545.965.939 1.828.939s1.268-.395 1.828-.939c.656-.641 1.474-1.437 3.049-1.437.913 0 1.67.263 2.383.828a.875.875 0 1 1-1.087 1.371c-.294-.233-.654-.449-1.295-.449-.863 0-1.268.395-1.828.939-.659.641-1.476 1.437-3.051 1.437zm-11.491-8.61a3.766 3.766 0 0 1-3.762-3.762 3.767 3.767 0 0 1 3.762-3.763c1.279 0 2.319 1.04 2.319 2.319s-1.04 2.319-2.319 2.319a.875.875 0 0 1 0-1.75.57.57 0 0 0 0-1.138 2.015 2.015 0 0 0-2.012 2.013c0 1.109.903 2.012 2.012 2.012 1.906 0 3.456-1.55 3.456-3.456s-1.55-3.456-3.456-3.456a4.905 4.905 0 0 0-4.899 4.9.875.875 0 0 1-1.75 0 6.657 6.657 0 0 1 6.649-6.65c2.871 0 5.206 2.335 5.206 5.206s-2.334 5.206-5.206 5.206zm13.209 0c-2.871 0-5.206-2.335-5.206-5.206s2.335-5.206 5.206-5.206c2.075 0 3.763 1.688 3.763 3.762s-1.688 3.763-3.763 3.763c-1.278 0-2.318-1.04-2.318-2.319s1.04-2.319 2.318-2.319a.875.875 0 0 1 0 1.75.57.57 0 0 0 0 1.138 2.016 2.016 0 0 0 2.013-2.013 2.015 2.015 0 0 0-2.013-2.012 3.46 3.46 0 0 0-3.456 3.456 3.46 3.46 0 0 0 3.456 3.456 4.905 4.905 0 0 0 4.899-4.899.875.875 0 0 1 1.75 0c.001 3.666-2.983 6.649-6.649 6.649z"
      />
    </svg>
  )
}

export default memo(SVG)
