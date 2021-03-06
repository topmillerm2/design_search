import React from 'react';
import styled from 'styled-components';
import ColorsRadioButtons from './ColorsRadioButtons';
import { setItem, removeItem } from '../localStorage';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SearchBar = ({
  onSubmit,
  refetch,
  setCurrentPage,
  setPagination,
  setIsLoading,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [radioValue, setRadioValue] = React.useState(null);

  const onInputChange = ({ target: { value } }) => setSearchTerm(value);

  const onRadioChange = ({ target: { value } }) =>
    setRadioValue(!value ? null : value);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setItem('searchTerm', searchTerm);
    setItem('color', radioValue);
    await onSubmit(searchTerm, radioValue);
    setIsLoading(false);
  };

  const resetFields = () => {
    setCurrentPage(1);
    setPagination(50);
    removeItem('userIsSearching');
    removeItem('searchTerm');
    removeItem('color');
    setSearchTerm('');
    setRadioValue(null);
    refetch();
  };

  return (
    <div className='ui segment'>
      <form onSubmit={onFormSubmit} className='ui form'>
        <div className='field'>
          <label>Image Search</label>
          <input type='text' onChange={onInputChange} value={searchTerm} />
        </div>
        <ColorsRadioButtons
          onRadioChange={onRadioChange}
          radioValue={radioValue}
        />
        <ButtonContainer>
          <button
            className={`ui ${!searchTerm && 'disabled'} primary button`}
            type='submit'
          >
            Submit
          </button>
          <button className='ui button' type='button' onClick={resetFields}>
            Reset
          </button>
        </ButtonContainer>
      </form>
    </div>
  );
};

export default SearchBar;
