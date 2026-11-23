import type { TableConfigItem } from './TableConfigItem';

export interface Word {
  id: number,
  source_text: string,
  translation: string
}

export const translateTableConfig: TableConfigItem<Word>[] = [
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