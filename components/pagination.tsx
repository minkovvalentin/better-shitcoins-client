import styles from './styles/pagination.module.scss'
import ReactPaginate from 'react-paginate';

interface Props {
  pageCount: number,
  coinsPerPage: number,
  currentPage: number,
  setCurrentPage: Function,
  setPageOffset: Function,
  onPageChange: Function
}

 export default function  Pagination({pageCount, coinsPerPage, currentPage, setCurrentPage, setPageOffset, onPageChange}: Props) {

  return (<ReactPaginate
    forcePage={currentPage}
    initialPage={currentPage}
    previousLabel={'‹'}
    nextLabel={'›'}
    pageLabelBuilder={(page)=> `${page} / ${(pageCount)}`}
    breakLabel={''}
    pageCount={pageCount}
    marginPagesDisplayed={0}
    pageRangeDisplayed={0}
    onPageChange={(data: any) => {
      onPageChange(data.selected);
    }}
    containerClassName={styles['pagination']}
    pageClassName={styles['pagination-page']}
    activeClassName={styles['pagination-active']}
    previousClassName={currentPage === 0 ? `${styles['pagination-previous']} ${styles['pagination-disabled']}` : `${styles['pagination-previous']}`}
    nextClassName={currentPage === pageCount-1 ? `${styles['pagination-next']} ${styles['pagination-disabled']}` : `${styles['pagination-next']}`}
    previousLinkClassName	={styles['pagination-link']}
    nextLinkClassName={styles['pagination-link']}
    breakClassName={styles['pagination-break']}
  />)
}
