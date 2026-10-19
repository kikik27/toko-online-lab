import React from 'react';

const Table = ({ columns, data, keyField = 'id', renderRowActions }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ textAlign: col.align || 'left' }}>
                {col.label}
              </th>
            ))}
            {renderRowActions && (
              <th style={{ textAlign: 'center' }}>Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) ? (
            <tr>
              <td 
                colSpan={columns.length + (renderRowActions ? 1 : 0)} 
                style={{ textAlign: 'center', color: 'var(--text-muted)' }}
              >
                Belum ada data tersedia.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row[keyField]}>
                {columns.map((col, index) => (
                  <td key={index} style={{ textAlign: col.align || 'left' }}>
                    {col.render ? col.render(row[col.field], row) : row[col.field]}
                  </td>
                ))}
                {renderRowActions && (
                  <td style={{ textAlign: 'center' }}>
                    {renderRowActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
