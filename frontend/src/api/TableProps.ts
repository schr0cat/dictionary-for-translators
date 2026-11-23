import type { TableConfigItem } from './TableConfigItem';

export interface TableProps<T extends object> {
  data: T[],
  config: TableConfigItem<T>[],
  keyFn: (obj: T) => string | number
};