import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Categories({ categories, selectedId, onClickCategoryHandler }) {

  if (categories.length === 0) {
    return null;
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <Link
          className={`nav-link ${selectedId === 0 ? 'active' : null}`}
          to={'catalog'}
          onClick={(evt) => onClickCategoryHandler(evt, 0)}
        >
          Все
        </Link>
      </li>
      {categories.map((category) => {
        return (
          <li className="nav-item" key={category.id}>
            <Link
              className={`nav-link ${selectedId === category.id ? 'active' : null}`}
              to={`catalog?categoryId=${selectedId}`}
              onClick={(evt) => onClickCategoryHandler(evt, category.id)}
            >
              {category.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

Categories.propTypes = {
  categories: PropTypes.array,
  selectedId: PropTypes.number,
  onClickCategoryHandler: PropTypes.func
}

Categories.defaultProps = {
  categories: [],
  selectedId: 0
}

export default Categories;
