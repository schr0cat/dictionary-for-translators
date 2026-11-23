import type { TableConfigItem } from './TableConfigItem';

export const translateTableConfig: TableConfigItem[] = [
  {
    label: 'Слово',
    render: (wordObj) => wordObj.source_text,
    sortValue: (wordObj) => wordObj.source_text
  },

  {
    label: 'Перевод',
    render: (wordObj) => wordObj.translation,
    sortValue: (wordObj) => wordObj.translation
  }
];