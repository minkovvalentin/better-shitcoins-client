import styled from '@emotion/styled';
import style from './styles/multiselect.module.scss'
import Select, { SelectRenderer } from 'react-dropdown-select';
import { useState } from 'react';
import { Option } from '../interfaces/selectOptions';
import React from 'react';

interface StyledPros {
  options: Option[],
}

interface Props {
  options: Option[];
  onSelect: Function;
  width?: string;
  maxWidth?: string;
  multi?: boolean;
}

const Styled = ({ options }: StyledPros) => {

  const customContentRenderer =  ({ props, state, methods }: SelectRenderer<string | object>) => {
    return (
      <div className={style['custom-content-renderer-container']}>
        <span className={style['custom-content-renderer-label']}>{state.values.length} of {props.options.length} selected</span>
      </div>
    )
  }

  const customDropdownHandleRenderer =  ({ props, state, methods }: SelectRenderer<string | object>) => {
    return (
      <div className={style['custom-dropdown-handle-renderer-container']}>
        <svg className={style['custom-dropdown-handle-renderer-container']} height="252" width="252" viewBox="0 0 20 20" fill="#cccccc" aria-hidden="true" focusable="false" >
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </div>
    )
  }

  const customDropdownRenderer = ({ props, state, methods }: SelectRenderer<any>) => {
    const regexp = new RegExp(state.search, "i");

    return (
      <div className={style['custom-dropdown-renderer-main-container']}>
        {props.options
          .map(option => (
            <div className={style['custom-dropdown-renderer-item-container']} key={option.value} onClick={() => methods.addItem(option)}>
            <label className={`${style['checkbox']} ${style['path']}`}>
                <input
                  className={style['custom-dropdown-renderer-input']}
                  type="checkbox"
                  onChange={() => methods.addItem(option)}
                  checked={state.values.indexOf(option) !== -1}
                />
                <svg viewBox="0 0 21 21">
                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                </svg>
              </label>

              <span className={style['custom-dropdown-renderer-label']}>{option.label}</span>
            </div>
          ))}
      </div>
    );
  };

  return( 
    <React.Fragment>
      <StyledSelect
        multi
        separator={false}
        contentRenderer={customContentRenderer}
        dropdownHandleRenderer ={customDropdownHandleRenderer}
        dropdownRenderer={customDropdownRenderer}
        options={options}
        portal={document.body}
        values={[options[0]]}
        color="#333"
        dropdownGap={0}
        onChange={(value) =>
          console.log(`${value} whadup homie`)
        }
      />
    </React.Fragment>
  )
};

const StyledSelect = styled(Select)`
  background: transperent;
  border: 2px solid #eee  !important;
  border-radius: 0px;
  padding: 8px;
  max-height: 40px;
  width:250px;
  color: #fff;
  :hover{
    border: 2px solid rgba(238,238,238, 0.7) !important;
  }

`;

export default Styled;
