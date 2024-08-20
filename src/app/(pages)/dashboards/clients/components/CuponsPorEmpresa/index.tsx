"use client";
import { useState } from "react";
import styles from "./CuponsPorEmpresa.module.css";

export default function CuponsPorEmpresa() {
  const [widthProgressBar, setWidthProgressBar] = useState(60);

  return (
    <div className="flex flex-wrap px-2 sm:px-4">
      <h1 className="text-yellow-primary-400 text-2xl sm:text-3xl md:text-4xl w-full text-center mb-4">
        Estes são os seus cupons da Empresa Mais 1 Café
      </h1>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[380px] my-4">
          <thead className="bg-blue-primary-700">
            <tr>
              <th className="p-2 sm:p-4 rounded-tl-lg text-xs sm:text-sm">
                Nome do Cupom
              </th>
              <th className="p-2 sm:p-4 text-xs sm:text-sm">Qtd. de Ciclos</th>
              <th className="p-2 sm:p-4 text-xs sm:text-sm">Status</th>
              <th className="p-2 sm:p-4 rounded-tr-lg text-xs sm:text-sm">
                Vencimento
              </th>
            </tr>
          </thead>
          <tbody>
            {[60, 20, 50].map((progress, index) => (
              <tr
                key={index}
                className="text-center border-b-2 bg-blue-primary-400"
              >
                <td className="p-2 sm:p-4 text-xs sm:text-sm">
                  Compre 10 ganhe 2
                </td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm">10</td>
                <td className="p-2 sm:p-4">
                  <div className="flex justify-center">
                    <div
                      className={`${styles.flagProgress} w-24 sm:w-36 h-5 sm:h-6 bg-gray-600 rounded-lg after:bg-yellow-primary-400`}
                      style={{
                        ["--largura-progresso" as string]: `${progress}%`,
                      }}
                    >
                      <span className="relative z-10 text-xs sm:text-sm font-medium">
                        {progress}%
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm">10/01/2025</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
