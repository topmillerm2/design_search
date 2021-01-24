import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 700;

  span {
    font-size: 45px;
  }
`;

const ThrottleSlider = styled.div`
  margin-left: 10px;
`;

const GrayWord = styled.span`
  color: #dedede;
`;

const Favorites = styled(GrayWord)`
  font-size: 30px;
`;

const F = styled.span`
  color: black;
  font-size: 45px;
`;

const IconButton = styled.button`
  background-color: white !important;
`;

const Header = ({
  showFavorites,
  toggleFavorites,
  throttle,
  toggleThrottle,
  isLoading,
}) => (
  <Container>
    {showFavorites ? (
      <Favorites>
        <F>F</F>avorites.
      </Favorites>
    ) : (
      <Title>
        Design<span>.</span>
        <GrayWord>Search</GrayWord>
      </Title>
    )}
    <div>
      <IconButton
        className='ui icon button'
        onClick={() => toggleFavorites(!showFavorites)}
      >
        <i className={`heart ${!showFavorites && 'outline'} icon`}></i>
      </IconButton>
      <ThrottleSlider className='ui toggle checkbox'>
        <input
          type='checkbox'
          name='public'
          onClick={() => toggleThrottle(!throttle)}
        />
        <label>Throttle Network</label>
      </ThrottleSlider>
    </div>
  </Container>
);

export default Header;
