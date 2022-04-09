import React from 'react';
import './loadingScreen.css'

const LoadingScreen = () => {
    return (
    <div className='loading-screen'> 
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
    );
};

export default LoadingScreen;