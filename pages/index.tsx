import { useEffect, useState } from 'react'
import { Coin } from '../interfaces/coin'
import { coinsEndpoint } from '../routes/routes';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);

  /* Fetch coins */
  useEffect(() => {
    const getCoins = async () => {
     let fetchedCoins: Coin[] = await fetchCoin();
     setCoins(fetchedCoins);
     console.log(fetchedCoins);
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

  function formatCoin({
    id, comments, authorName, authorUrl, title, postTime, rank, score
    }: Coin): JSX.Element {
    return (
      <div key={id} className={styles['coin-container']}>
        {/* Title */}
        <p className={styles['coin-title']}>{title}</p>
        {/* Score */}
        <span className={styles['coin-score']}>{score}</span>
        {/* Comments */}
        <div className={styles['coin-comments-container']}>
          <span className={styles['coin-comments-label']}>{comments}</span>
          {/* TODO: Add funcitonality to expand comments */}
        </div>
        {/* Author */}
        <a className={styles['coin-author']} href={authorUrl}>{authorName}</a>
        {/* Post time */}
        <span className={styles['coin-post-time']}>{postTime}</span>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {coins &&
        <div className={styles['coins-container']}>
          {coins.map((coin)=>
            formatCoin(coin)
          )}
        </div>
      }
      {coins.length === 0 &&
        <div>Coins loading...</div>
      }
    </div>
  )
}
