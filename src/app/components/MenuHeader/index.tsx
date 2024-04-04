"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

type MenuHeaderProps = {
  logoutMethod?: () => void;
};

export default function MenuHeader({ logoutMethod }: MenuHeaderProps) {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const cookies = parseCookies();
      const token = cookies.token;
      setHasToken(!!token);
    };

    checkToken();
  }, []);

  return (
    <nav>
      <ul className="flex justify-center items-center gap-3">
        {!hasToken && (
          <>
            <li>
              <a
                className="flex justify-center items-center w-28 h-11 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent text-white rounded-lg transition-all cursor-pointer"
                href="/sign-in"
              >
                Entrar
              </a>
            </li>
            <li>
              <a
                className="flex justify-center items-center w-36 h-11 bg-transparent border-yellow-400 border-2 hover:bg-yellow-brand-400 text-white rounded-lg transition-all cursor-pointer"
                href="/area-do-cliente"
              >
                Área do Cliente
              </a>
            </li>
          </>
        )}
        {hasToken && (
          <li>
            <a
              className="flex justify-center items-center w-28 h-11 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent text-white rounded-lg transition-all cursor-pointer"
              onClick={logoutMethod}
            >
              Sair
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
