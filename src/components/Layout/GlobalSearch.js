import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const GlobalSearch = forwardRef(({ search, invisibleSearchForm, changeInputHandler, searchSubmitHandler }, ref) => {
  return (
    <form
      className={`header-controls-search-form form-inline ${invisibleSearchForm ? "invisible" : ""}`}
      onSubmit={(evt) => {
        evt.preventDefault();
        searchSubmitHandler();
      }}
    >
      <input className="form-control" placeholder="Поиск" ref={ref} value={search} onChange={changeInputHandler} />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  );
});

GlobalSearch.propTypes = {
  search: PropTypes.string,
  invisibleSearchForm: PropTypes.bool,
  changeInputHandler: PropTypes.func,
  searchSubmitHandler: PropTypes.func,
};

GlobalSearch.defaultProps = {
  search: '',
  invisibleSearchForm: false,
}

export default GlobalSearch;
