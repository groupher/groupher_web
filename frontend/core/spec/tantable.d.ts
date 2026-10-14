// core/src/types/tanstack-table.d.ts
import type { RowData, TableFeatures } from '@tanstack/table-core'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TFeatures extends TableFeatures, TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right'
    sticky?: 'left' | 'right'
  }
}
