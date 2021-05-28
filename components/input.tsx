import { KeyboardEventHandler } from 'react'
import style from './styles/input.module.scss'

interface Props {
  type?: string,
  placeholder?: string,
  min?:string,
  max?:string,
  step?: string,
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
}

 export default function 
  Pagination({ 
    type,
    placeholder,
    min,
    max,
    step,
    onKeyDown
  }: Props) {
    return(
      <input 
        className={style['input']} 
        type={type} 
        placeholder={placeholder}
        min={min}
        max={max}
        onKeyDown={onKeyDown}
        step={step}
      />
    )
}
