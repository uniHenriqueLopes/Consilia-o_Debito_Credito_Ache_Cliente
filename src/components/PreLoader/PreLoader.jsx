import React from "react";

// import { Container } from './styles';

function PreLoader() {
    return (
        <div className="preLoader">
            <div id="preloader">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default PreLoader;
