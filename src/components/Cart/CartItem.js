import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CartItem({ index, id, productId, title, selectedSize, count, price, removeItemFromCartHandler }) {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td><Link to={`/catalog/${productId}`}>{title}</Link></td>
      <td>{selectedSize}</td>
      <td>{count}</td>
      <td>{price.toLocaleString()} руб.</td>
      <td>{(price * count).toLocaleString()} руб.</td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => removeItemFromCartHandler(id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  index: PropTypes.number,
  id: PropTypes.string,
  productId: PropTypes.number,
  title: PropTypes.string,
  selectedSize: PropTypes.string,
  count: PropTypes.number,
  price: PropTypes.number,
  removeItemFromCartHandler: PropTypes.func,
}

CartItem.defaultProps = {
  index: 0,
  id: '',
  productId: 0,
  title: '',
  selectedSize: '',
  count: 0,
  price: 0,
}

export default CartItem;
