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

  if (sortOrder && sortBy) {
    const { sortValue } = config.find(column => column.label === sortBy);

    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * reverseOrder;
      };

      return (valueA - valueB) * reverseOrder;
    });
  };

  return {
    sortBy,
    sortOrder,
    setSortColumn,
    sortedData
  };
};
