import React from 'react';
import './style.css';

const Feedback = ({feedBack}) => {
    return(
        <div className={`alert ${feedBack.type} ${ feedBack.visible } fade show margin_all`}  role="alert">
            <strong>{feedBack.title}</strong> {feedBack.message}
        </div>
    )
}

export default Feedback;

