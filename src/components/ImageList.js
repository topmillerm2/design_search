import React from 'react';
import styled from 'styled-components';
import { getItem, setItem } from '../localStorage';
import ImageCard from './ImageCard';
import Loader from './Loader';

const NoResultsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  span {
    font-size: 20px;
    margin: 28px 0;
  }

  i {
    font-size: 3rem;
  }
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0 10px;
  grid-auto-rows: 10px;

  img {
    width: 250px;
    grid-row-end: span 2;
  }
`;

const Modal = styled.div`
  top: 22%;
  left: 12%;
`;

const ImageList = ({ images, isLoading }) => {
  const [selectedImage, setSelectedImage] = React.useState({});
  const [isModalActive, toggleModal] = React.useState(false);
  const [favs, updateFavs] = React.useState(JSON.parse(getItem('favorites')));

  const imageList = images.map((image) => (
    <ImageCard
      key={image.id}
      image={image}
      setSelectedImage={setSelectedImage}
      toggleModal={toggleModal}
    />
  ));
  const addFavorite = () => {
    if (favs && favs.length > 0) {
      favs.push(selectedImage.urls.regular);
      setItem('favorites', JSON.stringify(favs));
      updateFavs([...favs, selectedImage.urls.regular]);
    } else {
      const arr = [];
      arr.push(selectedImage.urls.regular);
      setItem('favorites', JSON.stringify(arr));
      updateFavs(arr);
    }
  };

  const removeFavorite = () => {
    const favIndex = favs.indexOf(selectedImage.urls.regular);
    favs.splice(favIndex, 1);
    setItem('favorites', JSON.stringify(favs));
    updateFavs(favs);
    toggleModal(false);
  };

  const renderFavoritesButton = () => {
    if (favs?.includes(selectedImage.urls?.regular)) {
      return (
        <button className='ui negative basic button' onClick={removeFavorite}>
          Remove from Favorites
        </button>
      );
    } else {
      return (
        <button
          className='ui positive right labeled icon button'
          onClick={addFavorite}
        >
          Add to Favorites
          <i className='heart outline icon'></i>
        </button>
      );
    }
  };

  if (isLoading) {
    return <Loader />
  }

  return images.length === 0 ? (
    <NoResultsContainer>
      <span>No Results</span>
      <i className='frown icon'></i>
    </NoResultsContainer>
  ) : (
    <div className='ui segment'>
      <div className={`ui ${isModalActive && 'active'} dimmer`}></div>
      <ImagesContainer className='image-list'>
        {imageList}
        <Modal className={`ui ${isModalActive && 'active'} modal`}>
          <i className='close icon' onClick={() => toggleModal(false)}></i>
          <div className='header'>
            <span>
              {selectedImage.description || selectedImage.alt_description}
            </span>
            {favs?.includes(selectedImage.urls?.regular) && (
              <i className='heart icon'></i>
            )}
          </div>
          <div className='image content'>
            <div className='ui medium image'>
              <img
                src={selectedImage.urls?.regular}
                alt={selectedImage.description}
              />
            </div>
            <div className='description'>
              <div className='ui header'>
                Hex Color Theme: {selectedImage.color}
              </div>
              <a href={selectedImage.links?.download} download>
                Click to download
              </a>
            </div>
          </div>
          <div className='actions'>
            {renderFavoritesButton()}
            <button className='ui button' onClick={() => toggleModal(false)}>
              Close
            </button>
          </div>
        </Modal>
      </ImagesContainer>
    </div>
  );
};

export default ImageList;
