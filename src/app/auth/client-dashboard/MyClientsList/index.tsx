import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { parseCookies } from "nookies";

import { PencilSimple, UserCirclePlus } from "@phosphor-icons/react/dist/ssr";

type DataSchemaProducts = {
  id: string;
  name: string;
  cycle: number;
  description: string;
};

export default function MyClientsList() {
  const [products, setProducts] = useState([]);
  const cookies = parseCookies();
  const authToken = cookies.token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/getAllProducts", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, [authToken]);

  return (
    <>
      <h2 className="my-10">Todos os seus Produtos</h2>

      <table className="w-full rounded">
        <thead>
          <th className="text-center p-4 bg-brand-400">Nome do Produto</th>
          <th className="text-center p-4 bg-brand-400">Quantidade de Ciclos</th>
          <th className="text-center p-4 bg-brand-400">Descricao</th>
          <th className="text-center p-4 bg-brand-400">Editar Produto</th>
          <th className="text-center p-4 bg-brand-400">
            Associar Cliente ao Produto
          </th>
        </thead>

        <tbody>
          {products.map((product: DataSchemaProducts, index: number) => (
            <tr
              key={product.id}
              className="bg-brand-800 transition-all hover:bg-brand-400"
            >
              <td className="p-6 text-center">{product.name}</td>
              <td className="p-6 text-center">{product.cycle}</td>
              <td className="p-6 text-center">{product.description}</td>
              <td className="p-6 text-center">
                <a className="flex justify-center">
                  <PencilSimple size={24} color="#f0f0f0" />
                </a>
              </td>
              <td className="p-6 text-center">
                <a className="flex justify-center">
                  <UserCirclePlus size={24} color="#f0f0f0" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
