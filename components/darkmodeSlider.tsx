import { useState } from 'react'
import styles from './styles/darkmodeSlider.module.css'
import Slider from './slider';

 export default function  DarkmodeSlider() {
  const [sliderChecked, setSliderChecked] = useState<boolean>(true);

  return ( 
      <div className={styles['slider-container']}>
        <span className={styles['slider-label']}> darkmode</span>
        <Slider checked={sliderChecked} setChecked={setSliderChecked}/>
    </div>
  );
}
