import { useEffect, useState } from 'react'
import { Coin } from '../interfaces/coin'
import { coinsEndpoint } from '../routes/routes';
import styles from '../styles/Home.module.css'
import DarkmodeSlider from '../components/darkmodeSlider';
import Spinner from '../components/loaderSpinner';
import CoinsList from '../components/coinsList'
export default function Home() {

  const [coins, setCoins] = useState<Coin[]>([]);
  const [darkmode, setDarkmode] = useState<boolean>(false);
  
  /* Fetch coins */
  useEffect(() => {
    const getCoins = async () => {
     let fetchedCoins: Coin[] = await fetchCoin();
     setCoins(fetchedCoins);
    }    
    getCoins();
  },[]);
  
  async function fetchCoin<Coin>(): Promise<Coin[]> {
    const response = await fetch(coinsEndpoint);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json().then(data => data as Coin[]);
  }

  return (
    <div className={styles.container}>
      <div className={styles['slider-container']}>
        <DarkmodeSlider/>
      </div>
      {coins.length > 0 &&
        <CoinsList coins={coins}/>
      }
      {coins.length === 0 &&
        <Spinner/>
      }
    </div>
  )
}
