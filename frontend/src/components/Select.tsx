import { useState } from 'react';

export type SelectOption = {
  value: string,
  label: string
};

interface SelectProps {
  options: SelectOption[]
};

// TODO: завершить настройку этого компонента (написать стили) и интегрировать его в форму AddWordsForm

function Select({ options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState('Выберите...');

  const handleOptionClick = (option: string) => {
    setActiveOption(option);
    setIsOpen(!isOpen);
  };

  const handleActiveOptionClick = () => {
    setIsOpen(!isOpen);
  };

  const renderedOptions = options.map((option) => {
    return <div key={option.value} onClick={() => handleOptionClick(option.label)}>{option.label}</div>
  });

  return <div>
    <div onClick={handleActiveOptionClick}>{activeOption}</div>
    
    {isOpen && renderedOptions}
  </div>
};

export default Select;