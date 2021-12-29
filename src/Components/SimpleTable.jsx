import React from 'react';

const SimpleTable = (props) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {props.titles.map((title) => (
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {props.rows?.length ? props.rows.map((row) => (
                    <tr key={row[props.key]}>
                        {
                            Object.keys(row).map((k) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {row[k]}
                                </td>
                            ))
                        }
                    </tr>
                ))
                    :
                    <tr>
                        <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">Table is Empty...</div>
                        </td>
                    </tr>}
            </tbody>
        </table>
    );
}

export default SimpleTable;
