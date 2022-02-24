import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Product/Card';

function Products({ products }) {

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="row">
      {products.map((product) => {
        return (
          <div className="col-4" key={product.id}>
            <Card {...product} cardClass="catalog-item-card" />
          </div>
        );
      })}
    </div>
  );
}

Products.propTypes = {
  products: PropTypes.array,
}

Products.defaultProps = {
  products: [],
}

export default Products;
