import styles from './styles/slider.module.css'

interface Props {
  checked:boolean;
  setChecked: Function;
}

 export default function  Slider({checked, setChecked}: Props) {
  return ( 
      <label className={styles['switch']}>
        <input type="checkbox" className={styles['checkbox']} checked={checked} onChange={()=> setChecked(!checked)}/>
        <span className={styles['slider']}></span>
      </label>
  );
}
