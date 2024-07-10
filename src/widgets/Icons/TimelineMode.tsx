import { memo, type SVGProps } from 'react'

const TimelineMode = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="prefix__icon"
      viewBox="0 0 1027 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200.586}
      height={200}
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path d="M662.844 683.716a44.906 44.906 0 0017.71-3.795 63.247 63.247 0 0015.179-10.752 49.333 49.333 0 0010.12-15.18 34.786 34.786 0 004.427-17.709 63.247 63.247 0 000-10.752 70.205 70.205 0 00-4.427-10.12 63.247 63.247 0 00-5.693-8.222 37.948 37.948 0 01-4.427-8.222l-116.375-120.17-35.419-246.665a51.863 51.863 0 00-6.325-16.444 99.299 99.299 0 00-10.752-13.282 44.273 44.273 0 00-15.18-8.223 36.051 36.051 0 00-18.341 0 41.743 41.743 0 00-17.077 3.795 51.863 51.863 0 00-13.914 10.12 50.598 50.598 0 00-9.487 13.282 43.008 43.008 0 00-4.428 17.71l-5.692 286.51a89.179 89.179 0 000 11.385 34.154 34.154 0 000 12.017l7.59 10.12a30.991 30.991 0 0011.384 10.119l175.828 109.418 5.693 4.427h13.282z" />
      <path d="M984.141 316.248a522.424 522.424 0 00-110.05-163.178A505.98 505.98 0 00711.545 40.49 494.595 494.595 0 00512.315.01a490.168 490.168 0 00-196.067 40.48A505.98 505.98 0 0040.49 316.247 490.168 490.168 0 00.011 512.315a494.595 494.595 0 0040.478 199.23A505.98 505.98 0 00149.907 874.09a522.424 522.424 0 00166.341 110.05 500.288 500.288 0 00199.23 39.846 505.98 505.98 0 00199.23-39.846 519.262 519.262 0 00272.596-272.596 505.98 505.98 0 0039.846-199.23 500.288 500.288 0 00-43.009-196.067zM879.151 666.64a408.579 408.579 0 01-212.512 212.512 387.075 387.075 0 01-154.324 31.623 382.647 382.647 0 01-154.324-31.623 413.638 413.638 0 01-126.494-86.017 406.049 406.049 0 01-85.385-126.495 387.075 387.075 0 010-309.28 406.049 406.049 0 0185.385-126.495A401.621 401.621 0 01357.99 145.48a373.16 373.16 0 01154.324-32.256A379.485 379.485 0 01666.64 145.48a406.049 406.049 0 01126.495 85.384 418.698 418.698 0 0186.017 126.495 394.032 394.032 0 010 309.28z" />
    </svg>
  )
}

export default memo(TimelineMode)
