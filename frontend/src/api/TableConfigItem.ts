export interface TableConfigItem<T> {
  label: string,
  render: (obj: T) => string | number,
  sortValue?: (obj: T) => string | number,
  header?: () => React.JSX.Element
};