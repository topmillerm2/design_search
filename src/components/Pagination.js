import React from 'react';
import styled from 'styled-components';
import { getItem } from '../localStorage';

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const Pagination = ({
  currentPage,
  pagination,
  setCurrentPage,
  onPagePress,
  setIsLoading,
}) => {
  React.useEffect(async () => {
    if (getItem('userIsSearching') === 'true') {
      await onPagePress();
      setIsLoading(false);
    }
  }, [currentPage, onPagePress]);

  const onPageClick = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const FirstOrLastPage = ({ page }) => (
    <button
      className={`${currentPage === page && 'active'} item ui button`}
      onClick={() => onPageClick(page)}
    >
      {page}
    </button>
  );
  const CurrentPage = () => (
    <button
      className='active item ui button'
      onClick={() => onPageClick(currentPage)}
    >
      {currentPage}
    </button>
  );
  const BeforeOrAfterPage = ({ page }) => (
    <button className='item ui button' onClick={() => onPageClick(page)}>
      {page}
    </button>
  );
  const DisabledPage = () => <div className='disabled item'>...</div>;

  const renderPagination = () => {
    let arr = [];
    for (let i = 1; i <= pagination; i++) {
      if (i === 1) {
        arr.push(<FirstOrLastPage key={i} page={1} />);
        continue;
      }
      if (currentPage === i) {
        arr.push(<CurrentPage key={i} />);
        continue;
      }
      if (i === currentPage - 1) {
        arr.push(<BeforeOrAfterPage key={i} page={i} />);
        continue;
      }
      if (i === currentPage + 1) {
        arr.push(<BeforeOrAfterPage key={i} page={i} />);
        continue;
      }
      if (i === currentPage - 2 || i === currentPage + 2) {
        arr.push(<DisabledPage key={i} />);
        continue;
      }
      if (i === pagination) {
        arr.push(<FirstOrLastPage key={i} page={pagination} />);
        continue;
      }
      arr.push(null);
      continue;
    }
    return arr;
  };

  return (
    <Container>
      <div className='ui pagination menu'>{renderPagination()}</div>
    </Container>
  );
};

export default Pagination;
