import type { TableProps } from '../api/TableProps';

function Table<T extends object>({ 
  data, 
  config,
  keyFn
}: TableProps<T>) {
  const renderedHeaders = config.map((column) => {
    return <th key={column.label}>{column.label}</th>
  });

  // TODO: ещё раз внимательно изучить работу этого кода

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return <td className='p-2' key={column.label}>{column.render(rowData)}</td>
    });

    return <tr className='border-b' key={keyFn(rowData)}>
      {renderedCells}
    </tr>
  });

  return <table>
    <thead>
      <tr className='border-b-2'>
        {renderedHeaders}
      </tr>
    </thead>

    <tbody>
      {renderedRows}
    </tbody>
  </table>
};

export default Table;