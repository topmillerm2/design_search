import React from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import { IMAGES_PER_PAGE } from '../constants';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import Pagination from './Pagination';
import Loader from './Loader';
import { getItem, setItem, removeItem } from '../localStorage';
import Header from './Header';

const Container = styled.div`
  margin-top: 25px;
  padding-bottom: 75px;
`;

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const App = () => {
  const [images, setImages] = React.useState([]);
  const [apiStatus, setApiStatus] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pagination, setPagination] = React.useState(50);
  const [showFavorites, toggleFavorites] = React.useState(false);
  const [throttle, toggleThrottle] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(throttle);

  const fetchData = React.useCallback(async () => {
    try {
      const { status, data } = await axios.get('/photos', {
        params: {
          page: currentPage,
          per_page: IMAGES_PER_PAGE,
          order_by: 'popular',
        },
      });
      setApiStatus(status);
      setImages(data);
      setIsLoading(false);
    } catch (err) {
      setApiStatus(400);
    }
  }, [currentPage]);

  React.useEffect(() => {
    if (getItem('userIsSearching')) {
      removeItem('userIsSearching');
    }
  }, []);

  React.useEffect(() => {
    if (!getItem('userIsSearching')) {
      fetchData();
    }
  }, [fetchData, currentPage]);

  const onSearchSubmit = React.useCallback(
    async (term = getItem('searchTerm'), color = getItem('color')) => {
      try {
        throttle && (await delay(2000));
        const {
          data: { results, total_pages },
          status,
        } = await axios.get('/search/photos', {
          params: {
            query: term,
            page: currentPage,
            per_page: IMAGES_PER_PAGE,
            color: color === 'null' ? undefined : color,
          },
        });
        setItem('userIsSearching', true);
        setApiStatus(status);
        setPagination(total_pages);
        setImages(results);
      } catch (err) {
        setApiStatus(400);
      }
    },
    [currentPage, throttle]
  );

  return (
    <>
      <Container className='ui container'>
        <Header
          showFavorites={showFavorites}
          toggleFavorites={toggleFavorites}
          throttle={throttle}
          toggleThrottle={toggleThrottle}
        />
        {apiStatus && apiStatus !== 200 && (
          <div className='ui warning message'>
            <i className='close icon' onClick={() => setApiStatus(null)}></i>
            <div className='header'>Error!</div>
            <p>There was an error in your request</p>
          </div>
        )}
        {!showFavorites && (
          <>
            <SearchBar
              refetch={fetchData}
              onSubmit={onSearchSubmit}
              setCurrentPage={setCurrentPage}
              setPagination={setPagination}
              setIsLoading={setIsLoading}
            />
            {images.length === 0 && !apiStatus ? (
              <Loader />
            ) : (
              <>
                <ImageList images={images} isLoading={isLoading} />
                {images.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    pagination={pagination}
                    setCurrentPage={setCurrentPage}
                    onPagePress={onSearchSubmit}
                    setIsLoading={setIsLoading}
                  />
                )}
              </>
            )}
          </>
        )}
        {showFavorites && (
          <ImageList
            images={JSON.parse(getItem('favorites')).map((url, i) => ({
              id: i,
              description: '',
              urls: { regular: url },
            }))}
          />
        )}
      </Container>
    </>
  );
};

export default App;
