import { cn } from '~/css'

type TProps = {
  className?: string
}

export default function useSalon({ className }: TProps) {
  return {
    wrapper: cn(
      'inline-flex size-full items-center justify-center rounded leading-none',
      className,
    ),
    emoji: 'object-contain',
  }
}
