import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductInfo from '../components/Product/ProductInfo';
import Preloader from '../components/Preloader';
import Error from '../components/Error';
import { getProductByIdRequest } from '../reducers/productSlice';
import { addItemToCart } from '../reducers/cartSlice';

function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, loading, error } = useSelector((store) => store.productSlice);
  const [selectedSize, setSelectedSize] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(getProductByIdRequest({ productId: id }));
  }, [dispatch, id]);

  const onClickSizeHandler = (size) => {
    setSelectedSize(size);
  }

  const incrementCount = () => {
    setCount((prevState) => prevState === 10 ? prevState : prevState + 1);
  }

  const decrementCount = () => {
    setCount((prevState) => prevState === 1 ? prevState : prevState - 1);
  }

  const addToCartHandler = () => {
    const cartItem = {
      productId: product.id,
      title: product.title,
      selectedSize,
      count,
      price: product.price,
    };

    dispatch(addItemToCart(cartItem));
    navigate("/cart");
  }

  const repeatRequestHandler = (evt) => {
    evt.preventDefault();

    dispatch(getProductByIdRequest({ productId: id }));
  }

  return (
    loading === 'pending'
      ? <section className="catalog-item">
        <Preloader />
      </section>
      : error === null
        ? <ProductInfo
          {...product}
          selectedSize={selectedSize}
          count={count}
          onClickSizeHandler={onClickSizeHandler}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          addToCartHandler={addToCartHandler}
        />
        : <section className="catalog-item">
          <Error message='Произошла ошибка!' repeatRequestHandler={repeatRequestHandler} />
        </section>

  );
}

export default ProductPage;
