import styles from './styles/loaderSpinner.module.css'

 export default function loaderSpiner() {
  return ( 
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner-ring"]}><div><span className={styles['spinner-poomoji']}>💩</span></div><div></div><div></div><div></div></div>
      <span>Fetching the brown gold...</span>
  </div>
  );
}
