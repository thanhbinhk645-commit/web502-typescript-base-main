import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Product = {
  _id: string;
  name: string;
  price: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

function ListPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/products"
        );
        setProducts(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAll();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách sản phẩm</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">
                  {item._id}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {item.name}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {item.price}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  <Link
                    to={`/edit/${item._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => console.log(item._id)}
                    className="ml-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;