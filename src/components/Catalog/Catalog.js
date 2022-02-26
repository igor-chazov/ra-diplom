import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import Categories from './Categories';
import Search from './Search';
import Preloader from '../Preloader';
import Error from '../Error';
import Products from './Products';
import {
  changeSearchStringValue,
  clearProducts,
  getCategoriesRequest,
  getProductsRequest,
} from '../../reducers/catalogSlice';

function Catalog({ withSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    products,
    categories,
    isAllProductsLoaded,
    selectedCategoryId,
    offset,
    searchString,
    loading,
    error
  } = useSelector((store) => store.catalogSlice);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    const categoryId = params.categoryId === undefined ? 0 : Number(params.categoryId);
    const searchString = params.search === undefined ? '' : params.search;

    dispatch(getCategoriesRequest()).then(({ type }) => {
      if (type === 'categories/getAll/fulfilled') {
        dispatch(getProductsRequest({ categoryId, offset: 0, searchString }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const changeInputValueHandler = (evt) => {
    if (evt.target.value === '') {
      dispatch(clearProducts());
      dispatch(getProductsRequest({ categoryId: selectedCategoryId, offset, searchString: '' }))
        .then(() => {
          const params = {};

          if (selectedCategoryId !== 0) {
            params.categoryId = selectedCategoryId;
          }

          navigate({
            pathname: '/catalog',
            search: `?${createSearchParams(params)}`
          })
        });
    }
    dispatch(changeSearchStringValue(evt.target.value))
  }

  const onSubmitSearchHandler = (evt) => {
    evt.preventDefault();

    if (searchString !== '') {
      dispatch(clearProducts());
      dispatch(getProductsRequest({ categoryId: selectedCategoryId, offset: 0, searchString }))
        .then(() => {
          const params = { search: searchString };

          if (selectedCategoryId !== 0) {
            params.categoryId = selectedCategoryId;
          }

          navigate({
            pathname: '/catalog',
            search: `?${createSearchParams(params)}`
          })
        });
    }
  }

  const onClickCategoryHandler = (evt, categoryId) => {
    evt.preventDefault();

    dispatch(clearProducts());
    dispatch(getProductsRequest({ categoryId, offset, searchString }))
      .then(() => {
        if (withSearch) {
          const params = {};

          if (categoryId !== 0) {
            params.categoryId = categoryId;
          }

          if (searchString !== '') {
            params.search = searchString;
          }

          navigate({
            pathname: '/catalog',
            search: `?${createSearchParams(params)}`
          })
        }
      });
  }

  const loadMoreProductsHandler = () => {
    dispatch(getProductsRequest({ categoryId: selectedCategoryId, offset: offset + 6, searchString }));
  }

  const repeatRequestHandler = (evt) => {
    evt.preventDefault();

    const params = Object.fromEntries([...searchParams])
    const categoryId = params.categoryId === undefined ? 0 : Number(params.categoryId);
    const searchString = params.search === undefined ? '' : params.search;

    dispatch(getCategoriesRequest()).then(({ type }) => {
      if (type === 'categories/getAll/fulfilled') {
        dispatch(getProductsRequest({ categoryId, offset: 0, searchString }));
      }
    });
    dispatch(getProductsRequest({ categoryId, offset, searchString }))
    dispatch(getProductsRequest({ categoryId: selectedCategoryId, offset: offset === 0 ? offset : offset + 6, searchString }));
  }

  if (products.length === 0 && !withSearch && loading === 'idle' && error === null) {
    return null;
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {withSearch
        ? <Search
          searchString={searchString}
          changeInputValueHandler={changeInputValueHandler}
          onSubmitSearchHandler={onSubmitSearchHandler}
        />
        : null
      }

      <Categories
        categories={categories}
        selectedId={selectedCategoryId}
        onClickCategoryHandler={onClickCategoryHandler}
      />
      <Products products={products} />

      {loading === 'pending' ? <Preloader /> : null}

      {loading === 'pending' || isAllProductsLoaded || error !== null ? null : (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={loadMoreProductsHandler}>Загрузить ещё</button>
        </div>
      )
      }

      {products.length === 0 && error === null && loading === 'idle'
        ? <>
          <p className="container text-center">По данному запросу ничего не найдено</p>
        </>
        : null
      }

      {error === null ? null : (
        <Error message='Произошла ошибка!' repeatRequestHandler={repeatRequestHandler} />
      )}
    </section>
  );
}

Catalog.propTypes = {
  withSearch: PropTypes.bool
}

Catalog.defaultProps = {
  withSearch: false
}

export default Catalog;
