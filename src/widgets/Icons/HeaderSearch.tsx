import type { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg className="prefix__icon" viewBox="0 0 1024 1024" width={200} height={200} {...props}>
    <defs>
      <style />
    </defs>
    <path d="M918.976 822.464L774.144 677.568a67.954 67.954 0 0 0-4.48-4.096c101.056-146.24 86.464-348.288-43.776-478.528-146.624-146.624-384.384-146.624-531.008 0s-146.624 384.32 0 530.944c130.24 130.176 332.224 144.832 478.592 43.776 1.344 1.536 2.688 3.072 4.096 4.48l144.896 144.832c26.816 26.88 69.888 26.688 96.512 0 26.88-26.88 26.688-69.888 0-96.512zm-241.28-144.832c-120 119.936-314.56 119.936-434.496 0-120-120-120-314.496 0-434.432s314.496-120 434.496 0c119.936 119.936 119.936 314.432 0 434.432z" />
  </svg>
)

export default SvgComponent
