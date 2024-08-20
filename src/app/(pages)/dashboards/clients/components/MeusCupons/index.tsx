"use client";

import ButtonYellowPrimary from "@/app/components/Buttons/YellowPrimary";
import Image from "next/image";

interface MeusCuponsProps {
  trigger: () => void;
}

export default function MeusCupons({ trigger }: MeusCuponsProps) {
  return (
    <div className="flex flex-wrap">
      <h1 className="text-yellow-primary-400 text-4xl w-full text-center mb-4">
        Meus cupons
      </h1>

      <table className="w-full m-6">
        <thead className="bg-blue-primary-700">
          <tr>
            <th className="p-4 rounded-ss-lg">Empresa</th>
            <th className="p-4">Em andamento</th>
            <th className="p-4">Não resgatados</th>
            <th className="p-4">Resgatados</th>
            <th className="p-4">Vencidos</th>
            <th className="p-4 rounded-se-lg">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center border-b-2 bg-blue-primary-400">
            <td className="p-4">
              <div className="flex items-center gap-2 justify-center">
                <Image
                  className="rounded-full"
                  src="/mais1cafe.png"
                  width={30}
                  height={30}
                  alt="logo client"
                />
                <span>Mais 1 Café Saens Pena</span>
              </div>
            </td>
            <td className="p-4">4</td>
            <td className="p-4">10</td>
            <td className="p-4">100</td>
            <td className="p-4">1</td>
            <td className="p-4">
              <ButtonYellowPrimary
                className="m-auto"
                content="Acessar"
                onClick={trigger}
              />
            </td>
          </tr>
          <tr className="text-center border-b-2 bg-blue-primary-400">
            <td className="p-4">
              <div className="flex items-center gap-2 justify-center">
                <Image
                  className="rounded-full"
                  src="/mais1cafe.png"
                  width={30}
                  height={30}
                  alt="logo client"
                />
                <span>Mais 1 Café Saens Pena</span>
              </div>
            </td>
            <td className="p-4">4</td>
            <td className="p-4">10</td>
            <td className="p-4">100</td>
            <td className="p-4">1</td>
            <td className="p-4">
              <ButtonYellowPrimary
                className="m-auto"
                content="Acessar"
                onClick={trigger}
              />
            </td>
          </tr>
          <tr className="text-center border-b-2 bg-blue-primary-400">
            <td className="p-4">
              <div className="flex items-center gap-2 justify-center">
                <Image
                  className="rounded-full"
                  src="/mais1cafe.png"
                  width={30}
                  height={30}
                  alt="logo client"
                />
                <span>Mais 1 Café Saens Pena</span>
              </div>
            </td>
            <td className="p-4">4</td>
            <td className="p-4">10</td>
            <td className="p-4">100</td>
            <td className="p-4">1</td>
            <td className="p-4">
              <ButtonYellowPrimary
                className="m-auto"
                content="Acessar"
                onClick={trigger}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
