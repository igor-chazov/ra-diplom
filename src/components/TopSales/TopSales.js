import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopSalesRequest } from '../../reducers/topSalesSlice';
import Preloader from '../Preloader';
import Error from '../Error';
import Card from '../Product/Card';

function TopSales() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.topSalesSlice);

  useEffect(() => {
    dispatch(getTopSalesRequest());
  }, [dispatch]);

  const repeatRequestHandler = (evt) => {
    evt.preventDefault();

    dispatch(getTopSalesRequest());
  }

  if (products.length === 0 && loading === 'idle' && error === null) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading === 'pending' ? <Preloader /> : (
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-4" key={product.id}>
                <Card {...product} />
              </div>
            );
          })}
        </div>
      )}

      {error === null ? null : (
        <Error message='Произошла ошибка!' repeatRequestHandler={repeatRequestHandler} />
      )}
    </section>
  );
}

export default TopSales;
