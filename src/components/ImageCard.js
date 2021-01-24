import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-row-end: ${(props) => props.gridRowEnd};

  img {
    cursor: pointer;
  }
`;

const ImageCard = ({ image, setSelectedImage, toggleModal }) => {
  const {
    description,
    urls: { regular },
  } = image;
  const [spans, setSpan] = React.useState();
  const ref = React.createRef();
  React.useEffect(() => {
    const setSpans = () => {
      const height = ref.current?.clientHeight;
      const spans = Math.ceil(height / 10 + 1);
      setSpan(spans);
    };
    ref.current.addEventListener('load', setSpans);
  }, [ref]);

  const onClick = () => {
    toggleModal(true);
    setSelectedImage(image);
  };

  return (
    <Container gridRowEnd={`span ${spans}`}>
      <img ref={ref} alt={description} src={regular} onClick={onClick} />
    </Container>
  );
};

export default ImageCard;
