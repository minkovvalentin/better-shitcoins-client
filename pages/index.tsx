import { useEffect, useState } from 'react'
import { fetchCoinDetails } from '../api/coinDetails';
import { RedditCoin } from '../interfaces/coin'
import styles from '../styles/Home.module.css'
import DarkmodeSlider from '../components/darkmodeSlider';
import Spinner from '../components/loaderSpinner';
import CoinsList from '../components/coinsList'
export default function Home() {

  const [coins, setCoins] = useState<RedditCoin[]>([]);
  const [darkmode, setDarkmode] = useState<boolean>(false);
  
  /* Fetch coins */
  useEffect(() => {
    const getCoins = async () => {
     let fetchedCoins: RedditCoin[] = await fetchCoinDetails();
     setCoins(fetchedCoins);
    }    
    getCoins();
  },[]);
  

  return (
    <div className={styles.container}>
      <div className={styles['slider-container']}>
        <DarkmodeSlider/>
      </div>
      {coins.length > 0 &&
        <CoinsList coinsData={coins}/>
      }
      {coins.length === 0 &&
        <Spinner/>
      }
    </div>
  )
}
