interface FnParam {
  [key: string]: string | number
};

export interface TableConfigItem {
  label: string,
  render: (obj: FnParam) => string | number,
  sortValue?: (obj: FnParam) => string | number
};