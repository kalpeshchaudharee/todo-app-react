import React from 'react';

const SimpleCheckbox = (props) => {
    return (
        <input
            id={props.id}
            name={props.name}
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            value={props.value}
            checked={props.value}
            onChange={props.onChange}
        />
    );
}

export default SimpleCheckbox;
