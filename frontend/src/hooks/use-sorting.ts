import { useState } from 'react';
import type { TableConfigItem } from '../api/TableConfigItem';

type Order = 'asc' | 'desc';

export function useSorting<T>(
  config: TableConfigItem<T>[], 
  data: T[]
) {
  const [sortOrder, setSortOrder] = useState<Order | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const setSortColumn = (label: string) => {
    if (sortBy && sortBy !== label) {
      setSortOrder('asc');
      setSortBy(label);
      return;
    };

    if (sortOrder === null) {
      setSortOrder('asc');
      setSortBy(label);
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
      setSortBy(label);
    } else if (sortOrder === 'desc') {
      setSortOrder(null);
      setSortBy(null);
    };
  };

  let sortedData = data;

  const sortValue = config.find(
    column => column.label === sortBy
  )?.sortValue;

  if (sortOrder && sortBy && sortValue) {
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * reverseOrder;
      };

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * reverseOrder;
      }

      throw new Error('Значения сортируемого столбца имеют разные типы');
    });
  };

  return {
    sortBy,
    sortOrder,
    setSortColumn,
    sortedData
  };
};
