import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { changeSearchStringValue, getProductsRequest } from '../../reducers/catalogSlice';
import CartControls from '../Cart/CartControls';
import GlobalSearch from './GlobalSearch';

function HeaderControls() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invisibleSearchForm, setInvisibleSearchForm] = useState(true);
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!invisibleSearchForm) {
      searchInputRef.current.focus();
    }
  }, [invisibleSearchForm]);

  const openSearchFormHandler = () => {
    if (search !== '') {
      searchSubmitHandler();
      return;
    }
    setInvisibleSearchForm(prevState => !prevState);
  }

  const changeInputHandler = ({ target }) => {
    setSearch(target.value);
    dispatch(changeSearchStringValue(target.value));
  }

  const searchSubmitHandler = () => {

    if (search === '') {
      dispatch(changeSearchStringValue(''));
      setInvisibleSearchForm(true);
      return;
    }

    dispatch(getProductsRequest({ categoryId: 0, offset: 0, searchString: search })).then(() => {
      setSearch('');
      searchInputRef.current.blur();
      setInvisibleSearchForm(true);
      navigate({
        pathname: '/catalog',
        search: `?${createSearchParams({ search })}`
      })
    });
  }

  return (
    <>
      <div className="header-controls-pics">
        <div data-id="search-expander" className="header-controls-pic header-controls-search"
          onClick={openSearchFormHandler} >
        </div>
        <CartControls />
      </div>
      <GlobalSearch
        search={search}
        invisibleSearchForm={invisibleSearchForm}
        changeInputHandler={changeInputHandler}
        searchSubmitHandler={searchSubmitHandler}
        ref={searchInputRef}
      />
    </>
  );
}

export default HeaderControls;
