import Button from "../component/ui/button";
import type { ProductPayloadType } from "../services/productService";

type Props = {
  products: ProductPayloadType[];
  onAdd?: () => void;
  onView?: (item: ProductPayloadType) => void;
  onEdit?: (item: ProductPayloadType) => void;
  onDelete?: (id: number) => void;
  selectedIds: number[];
  onCheckboxChange: (id: number) => void;
  selectAll: boolean;
  onSelectAll: () => void;
  onMultiSelect: () => void;
};

const ProductTable: React.FC<Props> = ({
  products,
  onAdd,
  onView,
  onEdit,
  onDelete,
  selectedIds,
  onCheckboxChange,
  selectAll,
  onSelectAll,
  onMultiSelect,
}) => {
  return (
    <div className="overflow-x-auto space-y-5">
      <div className="flex justify-end gap-2">
        <Button onClick={onAdd}>Create Product</Button>
        {selectedIds.length > 0 && (
          <Button className="bg-red-600 text-white" onClick={onMultiSelect}>
            Delete Selected
          </Button>
        )}
      </div>

      <table className="hidden md:table w-full rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={onSelectAll}
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              S:No
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Image
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              OriginalPrice
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Rating
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Reviews
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              InStock
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item._id} className="border-t border-gray-200">
              <td className="px-4 py-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item._id)}
                  onChange={() => onCheckboxChange(item._id)}
                />
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{item.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.category}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">₹{item.price}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.description && "-"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 ">
                {item.image ? (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:4000${item.image}`
                    }
                    alt={item.name}
                    className="w-8 h-8 object-cover"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.originalPrice}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">{item.rating}</td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {item.reviews}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {item.inStock ? "Yes" : "No"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 ">
                <div className="flex space-x-2">
                  <div
                    className="font-medium cursor-pointer text-sm "
                    onClick={() => onView?.(item)}
                  >
                    View
                  </div>
                  <div
                    className="font-medium cursor-pointer text-sm "
                    onClick={() => onEdit?.(item)}
                  >
                    Edit
                  </div>

                  <div
                    className="font-medium cursor-pointer text-sm "
                    onClick={() => onDelete?.(item._id)}
                  >
                    delete
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden space-y-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-sm p-4 bg-white"
          >
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">ID:</span>
              <span className="text-gray-600">{item._id}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Name:</span>
              <span className="text-gray-600">{item.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Description:</span>
              <span className="text-gray-600">{item.description && "-"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Price:</span>
              <span className="text-gray-600">${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
