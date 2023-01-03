import { memo, SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 450 420"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <g fillRule="evenodd">
        <path
          d="M98.287 53.676c-3.688 2.001-8.29 6.771-10.234 10.608l-.853 1.684v259.664l.855 1.676c1.94 3.803 5.908 7.921 9.94 10.317l2.652 1.575H282.53l1.835-1.062c4.165-2.41 6.784-4.851 9.417-8.777l1.818-2.71v-52.95l-1.084-1.951c-1.37-2.467-6.046-7.255-8.907-9.121l-2.191-1.429H178.583l-3.056-1.789c-3.428-2.007-6.929-5.624-9.022-9.323l-1.295-2.288-.005-91.438-.005-91.438-1.544-2.362c-.85-1.299-1.885-2.723-2.3-3.165-2.118-2.249-5.683-5.149-7.399-6.019l-1.93-.978-25.714.011-25.713.01-2.313 1.255m56.602 9.552 2.311 2.429v91.907c0 90.679.011 91.95.802 95.072 2.15 8.477 6.021 12.683 14.198 15.425l2.8.939 53.904.108 53.903.109 2.397 2.419 2.396 2.419V326l-2.4 2.4-2.4 2.4H100.457l-2.429-2.311-2.428-2.31V65.472l2.336-2.336 2.336-2.336h52.307l2.31 2.428"
          fill="#fcfcfc"
        />
        <path
          d="M97.936 63.136 95.6 65.472v260.707l2.428 2.31 2.429 2.311H282.8l2.4-2.4 2.4-2.4v-51.945l-2.396-2.419-2.397-2.419-53.903-.109L175 269l-2.8-.939c-8.177-2.742-12.048-6.948-14.198-15.425-.791-3.122-.802-4.393-.802-95.072V65.657l-2.311-2.429-2.31-2.428h-52.307l-2.336 2.336"
          fill="#fcfcfc"
        />
        <path
          d="M0 204.2v204.2h400V0H0v204.2M153.957 53.378c1.716.87 5.281 3.77 7.399 6.019.415.442 1.45 1.866 2.3 3.165l1.544 2.362.005 91.438.005 91.438 1.295 2.288c2.093 3.699 5.594 7.316 9.022 9.323l3.056 1.789H283.418l2.191 1.429c2.861 1.866 7.537 6.654 8.907 9.121l1.084 1.951v52.95l-1.818 2.71c-2.633 3.926-5.252 6.367-9.417 8.777l-1.835 1.062H100.647l-2.652-1.575c-4.032-2.396-8-6.514-9.94-10.317l-.855-1.676V65.968l.853-1.684c1.944-3.837 6.546-8.607 10.234-10.608l2.313-1.255 25.713-.01 25.714-.011 1.93.978"
          fill="#009876"
        />
      </g>
    </svg>
  )
}

export default memo(SVG)
