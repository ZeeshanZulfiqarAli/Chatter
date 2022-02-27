import React from 'react';

function LayoutContainer({children}) {

    return (
        <header>
            <h1>Chatter!</h1>
            { children }
        </header>
    );
}

export default LayoutContainer;