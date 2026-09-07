type TClassValue = string | false | null | undefined
type TVariantValues = Record<string, TClassValue>
type TVariants = Record<string, TVariantValues>

type TVariantKey<TValues extends TVariantValues> = keyof TValues & string

type TNormalizedVariantKey<TKey extends string> = TKey extends 'true' | 'false'
  ? TKey | boolean
  : TKey

type TVariantProps<TConfig extends TVariants> = {
  [K in keyof TConfig]?: TNormalizedVariantKey<TVariantKey<TConfig[K]>> | null
}

type TDefaultVariants<TConfig extends TVariants> = Partial<{
  [K in keyof TConfig]: TNormalizedVariantKey<TVariantKey<TConfig[K]>>
}>

export type TTrConfig<TConfig extends TVariants> = {
  base?: TClassValue
  variants?: TConfig
  defaultVariants?: TDefaultVariants<TConfig>
}

const hasOwn = (record: object, key: PropertyKey): boolean =>
  Object.prototype.hasOwnProperty.call(record, key)

const normalizeKey = (value: unknown): string | undefined => {
  if (value === null || value === undefined) return undefined
  return String(value)
}

/**
 * Builds a typed, non-merging class recipe from explicit variant branches.
 * Unknown runtime keys fall back to the configured default variant.
 */
export const tr = <TConfig extends TVariants>(config: TTrConfig<TConfig>) => {
  const variants = config.variants || ({} as TConfig)
  const defaultVariants = config.defaultVariants || {}

  return (props: TVariantProps<TConfig> = {}): string => {
    const classes: string[] = []

    if (config.base) classes.push(config.base)

    for (const axis of Object.keys(variants)) {
      const values = variants[axis]
      const requested = normalizeKey((props as Record<string, unknown>)[axis])
      const fallback = normalizeKey((defaultVariants as Record<string, unknown>)[axis])
      const key = requested && hasOwn(values, requested) ? requested : fallback

      if (key && hasOwn(values, key)) {
        const className = values[key]
        if (className) classes.push(className)
      }
    }

    return classes.join(' ')
  }
}
