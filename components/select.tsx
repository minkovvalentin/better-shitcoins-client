import styles from './styles/select.module.scss'
import Select from 'react-select'
import { useState } from 'react';
import { Option } from '../interfaces/selectOptions';

interface Props {
  options: Option[];
  onSelect: Function;
  width?: string;
  maxWidth?: string;
  multi?: boolean;
}

const customStyles = (width?: string) => {
  return {
  container: (provided: any) => ({
    ...provided,
    width: `${width}px`,
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    backgroundColor: '#393e46',
    borderRadius: '0',
    border: '2px solid rgba(238,238,238, 0.8) !important',

  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#393e46',
    color: 'white',
    boxShadow: 'none !important',
    borderRadius: 'none',
    border: '2px solid #eeeeee !important',
    maxHeight: '100px',
    cursor: 'pointer',
    "&:hover": {
      border: '2px solid rgba(238,238,238, 0.7) !important',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#eeeeee',
    fontSize: '18px',
    transition : 'opacity 300ms',
  }),
  option: (provided: any, state:any) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'rgba(238, 238, 238, 0.4)' : '#393e46',
    color: state.isSelected ? '#222831' :'#eeeeee',
    borderRadius: '0 !important',
    "&:hover": {
      backgroundColor: 'rgba(238, 238, 238, 0.8) !important',
      color: '#222831 !important'
    },
  })
  }
}

export default function SelectComponent({options, onSelect, width, maxWidth, multi}: Props) {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const select = () => {
  return ( 
      <Select
        seperator={false}
        className={styles['select-container']}
        styles={customStyles(width)}
        menuPortalTarget={document.body} 
        isSearchable = {false}
        defaultValue={selectedOption}
        onChange={(value: any) => {
          onSelect(value.value)
          setSelectedOption(value)
        }}
        options={options}
      />
    );
  }

  return select()
}
