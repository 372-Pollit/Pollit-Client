import React from 'react';

export const User = (props) => {
    const userId = props.match.params.id;

    return (
        <div>
            <h1>This is user page</h1>
        </div>
    );
};