import { PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function MyClientsList() {
  return (
    <table className={`w-full mt-8 text-left relative z-10`}>
      <thead>
        <th className="p-3 bg-gray-500">Nome do Cliente</th>
        <th className="p-3 bg-gray-500">CPF do Cliente</th>
        <th className="text-center p-3 bg-gray-500">Gerenciar Cliente</th>
        <th className="text-center p-3 bg-gray-500">Remover Cliente</th>
      </thead>

      <tbody>
        <tr>
          <td className="p-3">Dimas Camillo</td>
          <td className="p-3">134.888.111-39</td>
          <td className="text-center p-3">
            <button className="border-2 border-white text-green-500 bg-white hover:bg-transparent hover:border-green-500 hover:text-white p-2 rounded-lg transition-all">
              <PencilSimple className="w-6 h-6" />
            </button>
          </td>
          <td className="text-center p-3">
            <button className="border-2 border-white text-red-500 bg-white hover:bg-transparent hover:border-red-500 hover:text-white p-2 rounded-lg transition-all">
              <Trash className="w-6 h-6" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
