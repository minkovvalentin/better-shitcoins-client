import styles from './styles/coinsList.module.scss'
import { Coin } from '../interfaces/coin'
import { convertTime } from '../utils/global';
import { useState } from 'react';
import Select from '../components/select';
import {Option} from '../interfaces/selectOptions';
import Pagination from './pagination';

interface CoinListProps {
  coins: Coin[]
}

const options: Option[] = [
  { value: 12, label: '12' },
  { value: 36, label: '36' },
  { value: 72, label: '72' },
];

const formatCoin =({
  id, comments, authorName, authorUrl, title, postTime, rank, score
  }: Coin): JSX.Element => {
    return (
      <div key={id} className={styles['coin-container']}>
        {/* Title */}
        <div className={styles['coin-title-container']}>
          <p className={styles['coin-title']}>{title}</p>
        </div>
        <div className="flex-grow"></div>
        {/* Score and Comments*/}
        <div className={styles['score-comments-container']}>
          <span className={styles['coin-score']}>{score}<span className={styles['coin-label']}> upvotes</span></span>
          <div className={styles['coin-comments-container']}>
            <span className={styles['coin-comments-label']}>{comments} <span className={styles['coin-label']}> comments</span></span>
            {/* TODO: Add funcitonality to expand comments */}
          </div>
        </div>
        {/* Author and Post time */}
        <div className={styles['author-post-time-container']}>
            <a target="_blank" rel="noopener noreferrer" className={styles['coin-author']} href={`https://${authorUrl}`}>
              <span className={styles['coin-label']}>Posted by </span>
              {authorName}
            </a>
            <span>at</span>
            <span className={styles['coin-post-time']}>{convertTime(postTime)}</span> 
        </div>
      </div>
    )
}

const coinsForPage = (coins:Coin[], coinsPerPage: number, offset: number) => {
  const currentCoins = coins.slice(offset, offset + coinsPerPage)

  return (
      <div className={styles['coins-container']}>
        {currentCoins.map((coin)=>
          formatCoin(coin)
        )}
      </div>
  );
}

const CoinsList = ({coins}: CoinListProps) => {

  const [offset, setPageOffset] = useState<number>(0);
  const [coinsPerPage, setCoinsPerPage] = useState<number>(12)
  const [pageCount, setPageCount] = useState<number>(Math.ceil(coins.length / coinsPerPage))
  const [currentPage, setCurrentPage] = useState<number>(0)

  const onCoinsPerPageChange = (setCoinsPerPageValue: string | number) => {

    const newCoinsPerPage = parseInt(setCoinsPerPageValue.toString())
    const newPageCount = Math.ceil(coins.length / newCoinsPerPage)

    setCoinsPerPage(newCoinsPerPage)
    setPageCount(newPageCount)
    setCurrentPage(0)
    setPageOffset(0)
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['coins-controls-container']}>
        <Select options={options} onSelect={onCoinsPerPageChange}/>
        <Pagination 
          currentPage={currentPage}
          pageCount={pageCount}
          coinsPerPage={coinsPerPage}
          setCurrentPage={setCurrentPage}
          setPageOffset={setPageOffset}
        />
      </div>
      <div className={styles['coins-main-container']}>
        {coinsForPage(coins, coinsPerPage, offset)}
      </div>
    </div>
  );
}

export default CoinsList
