import Table from './Table';
import { useSorting } from '../hooks/use-sorting';
import type { TableProps } from '../api/TableProps';
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";

// type SortableTableProps<T extends object> = Omit<TableProps<T>, 'keyFn'>
// Данный интерфейс наследует все свойства интерфейса TableProps, кроме свойства keyFn

function SortableTable<T extends object>({
  config,
  data,
  keyFn,
  ...rest
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

    return {
      ...column,
      header: () => {
        return <th 
          className='cursor-pointer hover:bg-gray-100'
          onClick={() => setSortColumn(column.label)}
        >
          <div className='flex items-center gap-2'>
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      }
    };
  });

  return <Table {...rest} keyFn={keyFn} data={sortedData} config={updatedConfig} />
};

function getIcons(label: string, sortBy: string | null, sortOrder: string | null) {
  if (label !== sortBy) {
    return <div>
      <VscTriangleUp />
      <VscTriangleDown />
    </div>
  };

  if (sortOrder === 'asc') {
    return <div>
      <VscTriangleUp />
    </div>
  } else if (sortOrder === 'desc') {
    return <div>
      <VscTriangleDown />
    </div>
  } else {
    return <div>
      <VscTriangleUp />
      <VscTriangleDown />
    </div>
  };
};

export default SortableTable;