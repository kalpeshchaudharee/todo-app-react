import React from 'react';

const SimpleBulkAction = (props) => {
    return (
        <div className="w-100 h-5 text-center">
            {
                props.data.length ?
                    <span className="cursor-pointer text-red-500 hover:text-red-900" onClick={props.action}>{props.actionText}</span>
                    : ''
            }
        </div>
    );
}

export default SimpleBulkAction;
