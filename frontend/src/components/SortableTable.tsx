import Table from './Table';
import { useSorting } from '../hooks/use-sorting';
import type { TableProps } from '../api/TableProps';

// type SortableTableProps<T extends object> = Omit<TableProps<T>, 'keyFn'>
// Данный интерфейс наследует все свойства интерфейса TableProps, кроме свойства keyFn

function SortableTable<T extends object>({
  config,
  data,
  keyFn
}: TableProps<T>) {
  const { 
    sortBy, 
    sortOrder, 
    setSortColumn, 
    sortedData
  } = useSorting<T>(config, data);

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    };

    // TODO: дописать код для отображения маркеров сортировки

    return {
      ...column,
      header: () => {
        return <th 
          className='cursor-pointer hover:bg-gray-100'
          onClick={() => setSortColumn(column.label)}
        >
          <div className='flex items-center gap-2'>
            {column.label}
          </div>
        </th>
      }
    };
  });

  console.log(sortBy);

  // TODO: определить, нужно ли мне передавать keyFn таким образом, как сейчас, или нужно использовать объект props, декомпозицию которого я должен передавать в Table. Выяснить, что из этого логичнее

  return <Table keyFn={keyFn} data={sortedData} config={updatedConfig} />
}

export default SortableTable;