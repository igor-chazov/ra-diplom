import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import changeSize from '../../utils/changeSize';
import noImage from '../../assets/svg/no-image.svg';

function Card({ id, title, price, images, cardClass }) {
  const prettyTitle = title.length > 37 ? `${title.slice(0, 36)}...` : title;

  const onError = (evt) => {
    evt.target.src = noImage;
  }

  return (
    <div className={`card ${cardClass}`}>
      <img src={images[0]} className="card-img-top img-fluid" alt={title} onLoad={changeSize} onError={onError} />
      <div className="card-body">
        <p className="card-text" title={title}>{prettyTitle}</p>
        <p className="card-text">{price.toLocaleString()} руб.</p>
        <Link to={`/catalog/${id}`} className="btn btn-outline-primary">Заказать</Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.array,
  cardClass: PropTypes.string,
}

Card.defaultProps = {
  id: 0,
  title: "",
  price: 0,
  images: [],
  cardClass: "",
}

export default Card;
