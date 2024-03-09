"use client";

import Image from "next/image";

import {
  User,
  LockKeyOpen,
  EyeSlash,
  Eye,
} from "@phosphor-icons/react/dist/ssr";

import logo from "@public/logo.svg";
import { useState } from "react";

export default function SignUp() {
  const [passwordType, setPasswordType] = useState("password");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  function handleTypePasswordToText() {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowPasswordIcon(true);
    } else {
      setPasswordType("password");
      setShowPasswordIcon(false);
    }
  }
  return (
    <main className="max-w-screen-sm w-full p-4 mx-auto my-8">
      <form className="flex flex-col">
        <figure className="w-full h-16 mb-8">
          <Image src={logo} alt="" className="w-full h-full object-contain" />
        </figure>
        <div className="flex flex-col gap-2 relative">
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="h-16 bg-white text-brand-600 border-none outline-none rounded-md pl-10"
            placeholder="Insira o seu e-mail"
          />
          <User size={22} className="absolute top-0 text-black left-3 top-14" />
        </div>

        <div className="flex flex-col gap-2 mt-4 relative">
          <label className="text-white" htmlFor="password">
            Password
          </label>
          <input
            type={passwordType}
            id="password"
            className="h-16 bg-white text-brand-600 border-none outline-none rounded-md pl-10"
            placeholder="Insira a sua senha"
          />
          <LockKeyOpen
            size={22}
            className="absolute top-0 text-black left-3 top-14"
          />
          <button type="button" onClick={handleTypePasswordToText}>
            {showPasswordIcon ? (
              <Eye
                size={22}
                className="absolute top-0 text-black right-3 top-14"
              />
            ) : (
              <EyeSlash
                size={22}
                className="absolute top-0 text-black right-3 top-14"
              />
            )}
          </button>
        </div>
        <button className="text-yellow-brand-400 text-right hover:text-yellow-brand-500 transition-all my-5">
          Esqueceu a senha?
        </button>

        <button className="h-16 bg-yellow-brand-400 text-center text-white hover:bg-yellow-brand-500 transition-all mt-2 p-1 rounded-md uppercase">
          Entrar
        </button>
      </form>
    </main>
  );
}
