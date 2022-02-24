import React from 'react';
import PropTypes from 'prop-types';

function Search({ searchString, changeInputValueHandler, onSubmitSearchHandler }) {
  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmitSearchHandler}>
      <input
        className="form-control"
        name="search"
        placeholder="Поиск"
        value={searchString}
        onChange={changeInputValueHandler} />
    </form>
  );
}

Search.propTypes = {
  searchString: PropTypes.string,
  changeInputValueHandler: PropTypes.func,
  onSubmitSearchHandler: PropTypes.func,
};

Search.defaultProps = {
  searchString: '',
};

export default Search;
