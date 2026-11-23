import Table from './Table';
import { useSorting } from '../hooks/use-sorting';
import type { TableProps } from '../api/TableProps';

interface SortableTableProps<T extends object> extends Omit<TableProps<T>, 'keyFn'> {}
// Данный интерфейс наследует все свойства интерфейса TableProps, кроме свойства keyFn

function SortableTable<T extends object>({
  config,
  data
}: SortableTableProps<T>) {
  

  return <div></div>
}

export default SortableTable;