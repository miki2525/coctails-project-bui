import React from 'react';

export default function TableTwoCol({className, data, header1Title, header2Title}) {
    return (
        <table className={className}>
            {/*header*/}
            <tr>
                <th>{header1Title}</th>
                <th>{header2Title}</th>
            </tr>
            {/*dataset*/}
            {data.map((row) => {
                return (
                    <tr>
                        <td>{row.name}</td>
                        <td>{row.value}</td>
                    </tr>
                )
            })}
        </table>
    )
}