import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import getCookie from '../../utils/getCookie';
import OrderForm from './OrderForm';
import Error from "../Error";
import {
  clearCartItems,
  createOrderRequest,
  setCustomerInfo,
  setOnSuccess
} from '../../reducers/cartSlice';

const initialStateOrderFrom = {
  phone: '',
  address: '',
  agreement: false,
}

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((store) => store.cartSlice);
  const [orderForm, setOrderForm] = useState(initialStateOrderFrom);
  let timeout;

  useEffect(() => {
    const cookie = getCookie();
    setOrderForm((prevState) => {
      return { ...prevState, phone: cookie.phone, address: cookie.address };
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);

  const onChangeFormFieldHandler = ({ target }) => {
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setOrderForm((prevState) => {
      return { ...prevState, [name]: value }
    });
  }

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    createOrder();
  }

  const repeatRequestHandler = (evt) => {
    evt.preventDefault();

    createOrder();
  }

  const createOrder = () => {
    if (orderForm.agreement) {
      const order = {
        owner: {
          phone: orderForm.phone,
          address: orderForm.address,
        },
        items: items.map((item) => {
          return {
            id: item.productId,
            price: item.price,
            count: item.count,
          }
        })
      }

      dispatch(createOrderRequest(order)).then((error) => {
        if (error.meta.requestStatus === 'fulfilled') {
          dispatch(setOnSuccess(true));
          dispatch(clearCartItems());
          dispatch(setCustomerInfo({ name: 'phone', value: order.owner.phone }));
          dispatch(setCustomerInfo({ name: 'address', value: order.owner.address }));

          timeout = setTimeout(() => {
            dispatch(setOnSuccess(false));
            navigate("/");
          }, 1000 * 10);
        }
      });
    }
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {error !== null
        ? <Error message='Произошла ошибка!' repeatRequestHandler={repeatRequestHandler} />
        : <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <OrderForm
              {...orderForm}
              loading={loading}
              onChangeFormFieldHandler={onChangeFormFieldHandler}
              onSubmitHandler={onSubmitHandler}
            />
          </div>
        </section>
      }
    </>
  );
}

export default Order;
