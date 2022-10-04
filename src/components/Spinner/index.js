import React from 'react';
import './style.css';

const Spinner = ({status}) => {
  return(
    <>
      { 
        status === true ? 
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
        : ''
      }
    </>
  )
}

export default Spinner;