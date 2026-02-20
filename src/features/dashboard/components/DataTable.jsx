import React from 'react';
import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react';

const DataTable = ({
  columns = [],
  data = [],
  onView,
  onEdit,
  onDelete,
  emptyMessage = "No data available",
  showActions = true,
}) => {
  const getCellValue = (row, column) => {
    if (column.render) {
      return column.render(row);
    }
    return row[column.key];
  };

  const renderActions = (row) => (
    <div className="flex items-center gap-1">
      {onView && (
        <button
          onClick={() => onView(row)}
          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
          title="View"
        >
          <Eye size={16} />
        </button>
      )}
      {onEdit && (
        <button
          onClick={() => onEdit(row)}
          className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit size={16} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => onDelete(row)}
          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-sm text-slate-700"
                    >
                      {getCellValue(row, column)}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-6 py-4 text-right">
                      {renderActions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

