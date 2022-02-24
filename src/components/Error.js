import React from 'react';
import PropTypes from 'prop-types';

function Error({ message, repeatRequestHandler }) {
  return (
    <div className="alert alert-danger d-flex justify-content-center align-items-center" role="alert">
      {message}
      {repeatRequestHandler === undefined ? null
        : <button className="btn btn-danger btn-sm ml-3" onClick={(evt) => repeatRequestHandler(evt)}>
          Повторить
        </button>
      }
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
  repeatRequestHandler: PropTypes.func,
}

Error.defaultProps = {
  message: '',
}

export default Error;
