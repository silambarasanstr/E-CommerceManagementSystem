// components/ui/table.tsx

export type Column<T> = {
  header: string;
  accessor: keyof T;
  className?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      {/* Desktop View */}
      <table className="hidden md:table w-full  rounded-4xl">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 ${
                  col.className || ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-t border-[#e5e7eb]">
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className={`px-4 py-3 text-sm text-gray-600 ${
                    col.className || ""
                  }`}
                >
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View (Card layout) */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="border rounded-lg shadow-sm p-4 bg-white"
          >
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex justify-between py-1">
                <span className="text-sm font-medium text-gray-700">
                  {col.header}
                </span>
                <span className="text-sm text-gray-600">
                  {String(row[col.accessor])}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
