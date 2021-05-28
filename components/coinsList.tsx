import styles from './styles/coinsList.module.scss'
import { RedditCoin, CoinParam } from '../interfaces/coin'
import { convertUnixTime } from '../utils/global';
import { useEffect, useState } from 'react';
import Select from '../components/select';
import MultiSelect from '../components/multiSelect';
import {Option} from '../interfaces/selectOptions';
import Pagination from './pagination';
import { SortEnum, SortingDirectionEnum } from '../enums/sort'
import Input from './input';
import * as Scroll from 'react-scroll'
import moment from "moment"

const scroll = Scroll.animateScroll
const scrollToTop = () => scroll.scrollToTop({duration: 300, smooth: 'easeInQuad'})

interface CoinListProps {
  coinsData: RedditCoin[]
}

const resultsPerPage = (first:number, second:number, third:number, max: number) :Option[] => { return ([
  { value: first, label: `${first} coins` },
  { value: second, label: `${second} coins` },
  { value: third, label: `${third} coins` },
  {value: max, label: `All (${max})`,}
])};

const sortBy: Option[] = [
  { value: 'Upvotes', label: 'Upvotes' },
  { value: 'Comments', label: 'Comments' },
  { value: 'Awards', label: 'Awards' },
];

const sources: Option[] = [
  { value: 'CryptoMoonShots1', label: '/r/CryptoMoonShots1' },
  { value: 'CryptoMoonShots2', label: '/r/CryptoMoonShots2' },
  { value: 'CryptoMoonShots3', label: '/r/CryptoMoonShots3' },
  { value: 'CryptoMoonShots4', label: '/r/CryptoMoonShots4' },
];

const CoinsList = ({coinsData}: CoinListProps) => {

  const getCurrentCoins = (offset: number, coinsPerPage:number) => coins.slice(offset, offset + coinsPerPage)

  const [offset, setPageOffset] = useState<number>(0);
  const [coinsPerPage, setCoinsPerPage] = useState<number>(12)
  const [pageCount, setPageCount] = useState<number>(Math.ceil(coinsData.length / coinsPerPage))
  const [currentPage, setCurrentPage] = useState<number>(0)
  /* All the coins fetched */
  const [coins, setCoins ] = useState<RedditCoin[]>(coinsData)
  /* Coins displayed per set page */
  const [currentCoins, setCurrentCoins] = useState<RedditCoin[]>(getCurrentCoins(offset, coinsPerPage))
  const [sorting, setSorting] = useState<SortEnum>(SortEnum.NONE)
  const [sortingDirection, setSortingDirection] = useState<SortingDirectionEnum>(SortingDirectionEnum.NONE)
  
  const onCoinsPerPageChange = (setCoinsPerPageValue: string | number) => {

    const newCoinsPerPage = parseInt(setCoinsPerPageValue.toString())
    const newPageCount = Math.ceil(coinsData.length / newCoinsPerPage)

    setCoinsPerPage(newCoinsPerPage)
    setPageCount(newPageCount)
    setCurrentPage(0)
    setPageOffset(0)
    setCurrentCoins(getCurrentCoins(0, newCoinsPerPage))   
  }

  const onPageChange = (page:number) => {
    scrollToTop();
    const newOffset = Math.ceil((coinsPerPage*page))
    setCurrentPage(page)
    setPageOffset(newOffset)
    setCurrentCoins(getCurrentCoins(newOffset, coinsPerPage))   
  }

  const onSortingSelected = (option: string) => {
    let sorted:RedditCoin[] = [];

    switch (option) {
      // case SortEnum.ADDED:
      //   setSorting(SortEnum.ADDED)
      //   sorted = coinsData.sort((a, b) => new Date(parseInt(b.score) * 1000).valueOf() - new Date(parseInt(a.score) * 1000).valueOf())
      case SortEnum.AWARDS:
        sorted = sortCoinsByProvidedParams(SortEnum.AWARDS, 'total_awards_received', coinsData, sortingDirection)
      break;
      case SortEnum.COMMENTS:
        sorted = sortCoinsByProvidedParams(SortEnum.COMMENTS, 'comments', coinsData, sortingDirection)
      break;
      case SortEnum.SCORE:
        sorted = sortCoinsByProvidedParams(SortEnum.SCORE, 'score', coinsData, sortingDirection)
      break;
    }
    
    updateCoins(sorted)
  }

  const sortCoinsByProvidedParams = (sortType: SortEnum, objectParam: CoinParam, coins: RedditCoin[], sortingDirection: SortingDirectionEnum): RedditCoin[] => {
    /* If filter has already been selected, check if its ascending or descending */
    let sorted;
    if(sorting === sortType) {
      /* If it is sorted by descending switch to ascending */
      if(sortingDirection === SortingDirectionEnum.ASCENDING) {
        setSortingDirection(SortingDirectionEnum.DESCENDING)
        sorted = coins.sort((a, b) => parseInt(b[objectParam].toString()) - parseInt(a[objectParam].toString()))
      } else {
        /* If it is sorted by ascending switch to descending */
        setSortingDirection(SortingDirectionEnum.ASCENDING)
        sorted = coins.sort((a, b) => parseInt(a[objectParam].toString()) - parseInt(b[objectParam].toString()))
      }
    } else {
      /* If filter hasn't been yet selected set to ascending*/
      sorted = coins.sort((a, b) => parseInt(b[objectParam].toString()) - parseInt(a[objectParam].toString()))
      setSorting(sortType)
      setSortingDirection(SortingDirectionEnum.DESCENDING)
    }

    return sorted
  }

  const formatCoin = ({
    id, comments, authorName, authorUrl, title, postTime, rank, score, total_awards_received
    }: RedditCoin): JSX.Element => {
      return (
        <div key={id} className={styles['coin-container']}>
          {/* Title */}
          <div className={styles['coin-title-container']}>
            <p className={styles['coin-title']}>{title}</p>
          </div>
          <p>{`${total_awards_received} awards`}</p>
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
              <span className={styles['coin-post-time']}>{convertUnixTime(postTime)}</span> 
          </div>
        </div>
      )
  }

  const getObjParamBySortType = (sortType: SortEnum):CoinParam => {
    // Default is score

    let objParam :CoinParam = 'score';

      switch (sortType) {
        case SortEnum.AWARDS:
          objParam = 'total_awards_received'
          break;
          case SortEnum.COMMENTS:
            objParam = 'comments'
          break;
          case SortEnum.SCORE:
            objParam =  'score'
          break;
      }

      return objParam;
  }

  const updateCoins =(newCoins: RedditCoin[]) => {
    if (newCoins.length > 0) {
      setCoins(newCoins)
      setCurrentCoins(getCurrentCoins(offset, coinsPerPage))
      scrollToTop();
    }
  }

  const onSortIconClick = (e:any) => {
    e.preventDefault()
    console.log('clicked')
    const newSortinDirection = sortingDirection === SortingDirectionEnum.DESCENDING ? SortingDirectionEnum.ASCENDING : SortingDirectionEnum.DESCENDING
    setSortingDirection(newSortinDirection)
    let sorted:RedditCoin[] = sortCoinsByProvidedParams(sorting,getObjParamBySortType(sorting),coinsData,sortingDirection)
    updateCoins(sorted)
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles['coins-controls-container']}>
        {/* Pagination */}
        <div className={`${styles['coins-control-container']} ${styles['pagination-container']}` }>
            <Pagination 
            currentPage={currentPage}
            pageCount={pageCount}
            coinsPerPage={coinsPerPage}
            setCurrentPage={setCurrentPage}
            setPageOffset={setPageOffset}
            onPageChange={onPageChange}
            />
          <span>{`Page`}</span>
        </div>

        {/* Sorting */}
        <div className={styles['coins-control-container']}>
          <Select 
            options={sortBy} 
            onSelect={onSortingSelected}
            width={'150'}/>
            <span>{`Sort by`}
              <button onClick = {onSortIconClick} className={styles['coins-control-sortin-direction-button']}>
                {sortingDirection === SortingDirectionEnum.ASCENDING ? '↑' : '↓'}
              </button>
            </span>
        </div>

        {/* Results per page */}
        <div className={styles['coins-control-container']}>
          <Select 
            options={resultsPerPage(16,36,72,coinsData.length)} 
            onSelect={onCoinsPerPageChange}
            width={'125'}
          />
          <span>{`per page`}</span>
        </div>
        {/* Subreddits*/}
        <div className={`${styles['coins-control-container']} ${styles['coins-control-subreddits-container']}`}>
          <MultiSelect 
            options={sources} 
          />
          <span>{`Sources`}</span>
        </div>

      </div>
      <div className={styles['coins-main-container']}>
      <div className={styles['coins-container']}>
          {currentCoins.map((coin)=>
            formatCoin(coin)
          )}
        </div>
      </div>
    </div>
  );
}

export default CoinsList
